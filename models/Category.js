const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: String,
  subcategories: [{type: mongoose.Schema.Types.ObjectId, ref: "Subcategory"}]
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
