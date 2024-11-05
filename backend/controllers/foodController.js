const mongoose = require("mongoose");
const fs = require("fs");
const foodModel = require("../models/foodModel");

const addFood = async (req, res) => {
   console.log("Form Data:", req.body);
   console.log("File Data:", req.file);

   if (!req.file) {
      return res.status(400).json({ success: false, message: "File upload failed" });
   }

   const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename, // Save only the filename
   });

   try {
      await food.save();
      console.log("Food Added Successfully"); // Success log
      res.json({ success: true, message: "Food Added" });
   } catch (error) {
      console.error("Error saving food item:", error); // Error log
      res.status(500).json({ success: false, message: "Error saving food item" });
   }
};


// all food list
const listFood = async (req, res)=>{
try {
    const foods = await foodModel.find({})
    res.json({success: true, data: foods})
} catch (error) {
    console.log(error)
    res.json({success: false, message:"Error"})
}
}
// remove list items
const removeFood = async  (req, res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, ()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({success: true, message:"Food removed"})
} catch (error) {
    console.log(error)
    res.json({success: false,  message:"Error"})
}
}

module.exports = {addFood, listFood, removeFood};
