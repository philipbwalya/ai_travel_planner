const db = require("../db");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const checkq = "SELECT * FROM users WHERE email = ?";
    db.query(checkq, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (result.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      // Define the values to be inserted
      const values = [
        firstname,
        lastname,
        email,
        hashedPassword,
        new Date(), // Insert current date and time
      ];

      // Insert the new user into the database
      const insertq =
        "INSERT INTO users (firstname, lastname, email, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(insertq, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(201).json({
          status: "success",
          message: "User registered successfully",
        });
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.signin = (req, res) => {
  try {
    const { email, rawpassword } = req.body;

    if (!email || !rawpassword) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill in all fields",
      });
    }
    //check email
    const checkq = "SELECT * FROM users WHERE email = ?";
    db.query(checkq, [email], async (err, result) => {
      //if error
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      //if user not found
      if (result.length === 0) {
        return res.status(404).json({ message: "Inavalid email or password" });
      }

      //check password
      const validPassword = await bcrypt.compare(
        rawpassword,
        result[0].password
      );
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: result[0].user_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
      const { password, ...others } = result[0];

      res.cookie("access_token", token, { httpOnly: true }).status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        user: others,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // getting token from headers and checking if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "You are not logged in. Please log in to get access",
        })
      );
    }

    // verification of token
    try {
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      // verifying if the user still exists
      const id = decoded.id;
      const freshUser = "SELECT * FROM users WHERE user_id = ?";
      db.query(freshUser, [id], (err, result) => {
        if (err) {
          return next(
            res.status(401).json({
              status: "fail",
              message: "The user belonging to this token does no longer exist.",
            })
          );
        }
        //grant access to protected route
        const { password, ...data } = result[0];
        req.user = data;
        console.log(req.user);
      });
      //moving to the next route
      next();
    } catch (error) {
      return next(
        res.status(401).json({
          status: "fail",
          message: "Invalid token!",
        })
      );
    }
  } catch (error) {
    return next(
      res.status(500).json({
        status: "fail",
        message: error.message,
      })
    );
  }
};
