const db = require("../db");

exports.createTrip = (req, res) => {
  try {
    const { user_id, trip_name, location, no_of_days, hotels, itinerary } =
      req.body;

    if (/*!user_id ||*/ !trip_name || !location || !no_of_days) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide all required fields!!!!!",
      });
    }

    // Insert trip data into the database
    const insertTripQuery = `
      INSERT INTO trips (user_id, trip_name, location, no_of_days) 
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertTripQuery,
      [user_id, trip_name, location, no_of_days],
      (err, result) => {
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
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({ message: err.message });
                  });
              } else {
                res.status(201).json({
                  status: "success",
                  message: "Trip created successfully, no itinerary provided",
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
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
};
