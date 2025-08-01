const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Find the user in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ Required on Vercel (HTTPS)
      sameSite: "None",
      maxAge: 60 * 60 * 10000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        // id: user._id,
        // username: user.username,
        role: user.role, // ✅ Send role
      },
    });
  } catch (err) {
    console.error("Error in userLogin controller \n", err);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true, // ✅ Required on Vercel (HTTPS)
    sameSite: "None", // ✅ Required for cross-origin cookie
    maxAge: 0, // ✅ Set cookie expiration to 1 hour
  });
  res.status(200).json({ message: "logout successfull" });
};

const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error in getMe controller:\n", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { userLogin, logout, getMe };
