const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express()
const domainRoutes = require("./routes/domain.routes")

app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://abhi:4tsHp2e3e9KQ88KN@cluster0.qohybo8.mongodb.net/test");
        console.log("connection successful");
    } catch (err) {
        console.log("failed to connect", err);
    }
};

connectDB()

app.use("/api", domainRoutes)

app.listen(3000, () => {
    console.log(`server is running on http://localhost:3000`);
});
