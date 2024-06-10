const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const authRoutes = require("./routes/auth")
const listingRoutes = require("./routes/listing")
const BookingRoutes = require("./routes/booking")
const UserRoutes = require("./routes/user")

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/auth",authRoutes);
app.use("/properties",listingRoutes);
app.use("/bookings",BookingRoutes);
app.use("/users",UserRoutes);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hotelData")
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Connection error", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
