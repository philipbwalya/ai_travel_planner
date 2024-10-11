const db = require("../db");

exports.createTrip = (req, res) => {
  try {
    const {
      user_id,
      trip_name,
      location,
      no_of_days,
      hotels,
      itinerary,
      traveler,
      budget,
    } = req.body;

    if (/*!user_id ||*/ !trip_name || !location || !no_of_days) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all required fields!!!!!",
      });
    }

    // Insert trip data into the database
    const insertTripQuery = `
      INSERT INTO trips (user_id, trip_name, location, no_of_days, traveler, budget) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [user_id, trip_name, location, no_of_days, traveler, budget];

    db.query(insertTripQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const trip_id = result.insertId;

      // Insert hotel options
      if (hotels && hotels.length > 0) {
        const hotelOptionPromises = hotels.map((option) => {
          const insertHotelOptionQuery = `
            INSERT INTO hotels (trip_id, hotel_name, hotel_address, price, hotel_image_url, geo_coordinates, rating, description) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          return new Promise((resolve, reject) => {
            db.query(
              insertHotelOptionQuery,
              [
                trip_id,
                option.hotelName,
                option.hotelAddress,
                option.price,
                option.hotelImageUrl,
                option.geoCoordinates,
                option.rating,
                option.description,
              ],
              (err) => {
                if (err) reject(err);
                resolve();
              }
            );
          });
        });

        // Execute all hotel option insertions
        Promise.all(hotelOptionPromises)
          .then(() => {
            // Insert itinerary
            if (itinerary) {
              const itineraryPromises = [];

              for (let day in itinerary) {
                itinerary[day].forEach((item) => {
                  const insertItineraryQuery = `
                    INSERT INTO itinerary (trip_id, day, time, place_name, place_details, place_image_url, geo_coordinates, ticket_pricing, time_to_travel)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;
                  itineraryPromises.push(
                    new Promise((resolve, reject) => {
                      db.query(
                        insertItineraryQuery,
                        [
                          trip_id,
                          day,
                          item.time,
                          item.placeName,
                          item.placeDetails,
                          item.placeImageUrl,
                          item.geoCoordinates,
                          item.ticketPricing,
                          item.timeToTravel,
                        ],
                        (err) => {
                          if (err) reject(err);
                          resolve();
                        }
                      );
                    })
                  );
                });
              }

              Promise.all(itineraryPromises)
                .then(() => {
                  res.status(201).json({
                    status: "success",
                    message: "Trip created successfully",
                    trip_id,
                  });
                })
                .catch((err) => {
                  res.status(500).json({ message: err.message });
                });
            } else {
              res.status(201).json({
                status: "success",
                message: "Trip created successfully, no itinerary provided",
                trip_id,
              });
            }
          })
          .catch((err) => {
            res.status(500).json({ message: err.message });
          });
      } else {
        res.status(201).json({
          status: "success",
          message: "Trip created successfully, no hotel options provided",
          trip_id,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};

// controller to retrieve a requested trip

exports.getTrip = (req, res) => {
  const { trip_id } = req.params;

  const tripQuery = `
    SELECT * FROM trips WHERE id = ?
  `;
  const hotelOptionsQuery = `
    SELECT * FROM hotels WHERE trip_id = ?
  `;
  const itineraryQuery = `
    SELECT * FROM itinerary WHERE trip_id = ?
  `;
  try {
    // Get the trip details..
    db.query(tripQuery, [trip_id], (err, tripResult) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error retrieving trip", error: err.message });
      }

      if (tripResult.length === 0) {
        return res.status(404).json({ message: "Trip not found" });
      }

      const trip = tripResult[0];

      // Get the hotel options
      db.query(hotelOptionsQuery, [trip_id], (err, hotelOptionsResult) => {
        if (err) {
          return res.status(500).json({
            message: "Error retrieving hotel options",
            error: err.message,
          });
        }

        trip.hotels = hotelOptionsResult;

        // Get the itinerary
        db.query(itineraryQuery, [trip_id], (err, itineraryResult) => {
          if (err) {
            return res.status(500).json({
              message: "Error retrieving itinerary",
              error: err.message,
            });
          }

          // structuring the itineraries in object form...something like
          //  {
          //   1: [
          //     { day: 1, time: "08:00", place_name: "Breakfast at Hotel", ... },
          //     { day: 1, time: "10:00", place_name: "Visit Museum", ... }
          //   ],
          //   2: [
          //     { day: 2, time: "09:00", place_name: "City Tour", ... },
          //     { day: 2, time: "14:00", place_name: "Lunch at Local Restaurant", ... }
          //   ]
          // }
          const itinerary = {};
          itineraryResult.forEach((item) => {
            if (!itinerary[item.day]) {
              itinerary[item.day] = [];
            }
            itinerary[item.day].push(item);
          });

          trip.itinerary = itinerary;

          // Send the final trip data with hotel options and itinerary
          res.status(200).json({
            status: "success",
            trip,
          });
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
