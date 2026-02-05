const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/todos", require("./routes/todoRoutes"));

// db connection
mongoose
    .connect("mongodb://127.0.0.1:27017/todoapp")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
