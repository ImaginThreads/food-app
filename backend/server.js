const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // Make sure this is at the top
const cors = require("cors");
const connectDB = require("./config/db");
const foodRouter = require("./routes/foodRoute");

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// api end points
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'))

app.get('/', (req, res) => {
    res.send("API working");
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
