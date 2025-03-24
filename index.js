
import express from "express";
import mongoose from "./ConnectDB/dbConnection.js";
import cors from "cors";
import "dotenv/config";
import userRouter from "./Routes/UserRoutes.js";
import ridesRoutes from "./Routes/RidesRoutes.js";
import http from "http";
import { Server } from "socket.io";
import locationRoutes from "./Routes/LocationRoutes.js";

const app = express();
const port = process.env.PORT || 4000; // use process.env.PORT for Vercel

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // This will allow us to handle JSON bodies

// for mongo db connection
mongoose.connection.on("error", (err) => {
  console.log("Error in connection", err);
});
mongoose.connection.on("open", () => {
  console.log("MongoDB is connected successfully");
});

// Creating HTTP server and WebSocket server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  methods: ["GET", "POST"],
});

let activeUsers = {}; // Object to store active users

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Event to register a user
  socket.on("registerUser", ({ userID }) => {
    activeUsers[userID] = socket.id;
    console.log(`User Registered: ${userID} -> ${socket.id}`);
  });

  // User requests a ride from the driver
  socket.on("userRequestToDriver", (userData) => {
    console.log("User requested a ride:", userData);
    const driverSocketID = activeUsers[userData.driver_ID];
    if (!driverSocketID) {
      socket.emit("driverOffline", "Driver is offline");
      return;
    }
    socket.to(driverSocketID).emit("rideRequest", userData);
    console.log("Ride Request sent to Driver:", userData);
  });

  // Driver accepts the request
  socket.on("DriverResponse_Accept", (data) => {
    console.log("Ride Accepted:", data);
    const userSocketID = activeUsers[data.requesteeID];
    console.log("userSocketID==>", userSocketID);
    socket.to(userSocketID).emit("requestAccepted", data);
  });

  // Driver rejects the request
  socket.on("DriverResponse_Reject", (data) => {
    console.log("Ride Rejected:", data);
    const userSocketID = activeUsers[data.requesteeID];
    console.log("userSocketID==>", userSocketID);
    socket.to(userSocketID).emit("requestRejected", data);
  });

  // recive Driver's live location from driver frontend & send it to user frontend
  socket.on("driverLiveLocation", (data) => {
    console.log("live location_driver ==> ", data);
    console.log("data.userID ==> ", data.userID);
    const userSocketID = activeUsers[data.userID];
    console.log("userSocketID==>", userSocketID);
    console.log("activeUsers ==> ", activeUsers);
    // socket.to(data.userID).emit("driverLocation", data);
    socket.to(userSocketID).emit("driverLocation", data);
  });

  // recive user's live location from user frontend & send it to driver frontend
  socket.on("userLiveLocation", (data) => {
    console.log("live location_user ==> ", data);
    console.log("data.driverID ==> ", data.driverID);
    const driverSocketID = activeUsers[data.driverID];
    console.log("driverSocketID==>", driverSocketID);
    console.log("activeUsers ==> ", activeUsers);    
    socket.to(driverSocketID).emit("userLocation", data);
  });

  // Handle user disconnection
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id} due to ${reason}`);

    // Handle different disconnection reasons
    if (reason === "io server disconnect") {
      console.log("Server disconnected this client manually.");
      socket.connect();
    } else if (reason === "transport close") {
      console.log("Client closed the browser/tab or network issue.");
    } else if (reason === "ping timeout") {
      console.log("Client lost internet connection.");
    } else if (reason === "transport error") {
      console.log("Possible firewall or proxy issue.");
    }
  });
});

// Main page message
app.get("/", (req, res) => {
  res.send("Welcome TO SHARING CAB");
});

// Using different routes
app.use("/user", userRouter);
app.use("/rides", ridesRoutes);
app.use("/location", locationRoutes);

server.listen(port, () => {
  console.log("server is running on port : ", port);
});
