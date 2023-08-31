const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connection } = require("../db");

//REGISTER
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const query = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
    connection.query(query, [name, email, passwordHash], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const savedUser = {
        name,
        email,
      };

      res.status(201).json({ savedUser, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//LOGIN
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if user exists
      if (results.length === 0) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      const user = results[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credential" });
      }

      // Generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

      // Remove password from the user object
      delete user.password;

      // Send response with token and user data
      res.status(200).json({ token, user, success: true });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
