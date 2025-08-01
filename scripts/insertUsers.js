const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Student = require("../models/student.model");

const MONGO_URI =
  "mongodb+srv://rakeshjoe53:Joe%401234@sh.wor9tka.mongodb.net/?retryWrites=true&w=majority&appName=sh";

async function insertInitialUsers() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const users = [
    {
      username: "Augustin",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: ["APH", "SH"],
        from: 21, // start room number
        to: 48, // end room number
      },
    },
    {
      username: "Vimal Jerald",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: ["VB", "JIM"],
        from: null, // start room number
        to: null, // end room number
      },
    },
    {
      username: "Jovin",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: [],
        from: 129, // start room number
        to: 146, // end room number
      },
    },
    {
      username: "Saravanan",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: [],
        from: 112, // start room number
        to: 128, // end room number
      },
    },
    {
      username: "Philips",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: [],
        from: 49, // start room number
        to: 100, // end room number
      },
    },
     {
      username: "Rex",
      password: await bcrypt.hash("1234", 10),
      role: "ad",
      roomsIncharge: {
        hall: ["Beschi Hall","Britto Hall","Xavier Hall", "Loyola Hall"],
        from: 2, // start room number
        to: 20, // end room number
      },
    },
  ];

  // await User.deleteMany({}); // Optional: clear old users
  await User.insertMany(users);
  // await Student.insertMany(students);
  console.log("Users inserted successfully");

  mongoose.disconnect();
}

insertInitialUsers().catch(console.error);
