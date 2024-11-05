const express = require("express");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = express.Router();

// Configure multer storage for file uploads
const storage = multer.diskStorage({
    destination: "uploads", // Ensure this folder exists in the root of your project
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// Route to add a new food item, with file upload handling
foodRouter.post("/add", upload.single("image"), addFood);

// Route to list all food items
foodRouter.get("/list", listFood);

// Route to remove a specific food item
foodRouter.delete("/remove", removeFood);

module.exports = foodRouter;
