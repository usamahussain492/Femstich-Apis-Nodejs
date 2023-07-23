const Category = require("../../../models/Category");
const Product = require("../../../models/Product");
const Store = require("../../../models/Store");
const Subcategory = require("../../../models/Subcategory");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    let subcategory = await Subcategory.findOne({ title: req.body.title });
    if (subcategory) {
      let category = await Category.findOne({ _id: req.body.id });
      if (!category) {
        throw new Error("This Category don't exists.");
      }
      category.subcategories.push(subcategory._id);
      await category.save();
      return res.status(200).json({
        code: 200,
        status: true,
        message: "SubCategory added to category successfully",
        result: {
          subcategory,
        },
      });
    }
    let category = await Category.findOne({ _id: req.body.id });
    if (!category) {
      throw new Error("This Category don't exists.");
    }
    subcategory = await Subcategory.create({ title: req.body.title });

    category.subcategories.push(subcategory._id);
    await category.save();

    return res.status(200).json({
      code: 200,
      status: true,
      message: "SubCategory created successfully",
      result: {
        subcategory,
      },
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the Subcategory.",
      error.message
    );
  }
};
