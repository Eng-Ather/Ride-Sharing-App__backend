import express from "express";
import dotenv from "dotenv";
import { RiderRides } from "../Controllers/Rides/RiderRides.js";
import { UserRide } from "../Controllers/Rides/UserRides.js";
dotenv.config(); // Load .env file

const ridesRoutes = express.Router();

ridesRoutes.post("/rider", RiderRides);

// for finding similar rides with gender specification
ridesRoutes.post("/user", UserRide);

export default ridesRoutes;
