const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema({
  title: String,
  // parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;
