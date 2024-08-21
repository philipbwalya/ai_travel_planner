const db = require("../db");

exports.getAllLoans = async (req, res) => {
  try {
    const loanquery =
      "SELECT firstname, lastname,email,role,created_at FROM users";
    db.query(loanquery, (err, result) => {
      if (err) throw err;
      res.status(200).json({ status: "success", data: result });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.singleLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loanquery = "SELECT * FROM users WHERE id = ?";
    db.query(loanquery, [id], (err, result) => {
      if (err) throw err;
      res.status(200).json({ status: "success", data: result });
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
