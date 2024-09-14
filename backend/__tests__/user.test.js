const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Adjust the path as needed
require("dotenv").config();

describe("User Model Test", () => {
  beforeAll(async () => {
    // Connect to the in-memory database (you could use a real test DB if preferred)
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    // Clean up: Delete test user if it exists
    await User.deleteOne({ username: "testuser1" });

    // Disconnect from the database
    await mongoose.connection.close();
  });

  it("should hash the password correctly", async () => {
    const password = "mypassword";
    const user = new User({
      username: "testuser1",
      email: "test@test.com",
      password,
    });

    await user.save();

    // Check that the password is hashed and not stored as plain text
    expect(user.password).not.toBe(password);

    // Check the matchPassword method
    const isMatch = await user.matchPassword(password);
    expect(isMatch).toBe(true);
  });
});
