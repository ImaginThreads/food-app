const express = require("express");
const {addFood, listFood, removeFood} = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = express.Router();

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");  // Ensure this folder path exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Route handler with Multer middleware applied directly
foodRouter.post("/add", upload.single("image"), (req, res) => {
    if (!req.file) {
        console.error("File not uploaded or missing from request.");
        return res.status(400).json({ success: false, message: "File upload failed" });
    }

    console.log("File processed by multer:", req.file); // Should log file info if successful
    addFood(req, res);
});
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter;
