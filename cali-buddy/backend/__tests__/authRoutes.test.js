const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Import your express app
const User = require("../models/User"); // Adjust the path as needed

require("dotenv").config();

describe("Auth Routes Test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    // Clean up: Delete test user if it exists
    await User.deleteOne({ username: "testuser2" });

    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "testuser2",
      password: "testpassword",
      email: "testuser@example.com",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "User registered successfully"
    );
    expect(response.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "testuser2",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("username", "testuser2");
  });
});
