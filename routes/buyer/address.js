const express = require("express");
const {
  AddAddress,
  UpdateAddress,
  GetAddress,
  DeleteAddress,
} = require("../../controllers/buyer");
const authorize = require("../../middlewares/authorize");
const router = express.Router();

router.post("/add", authorize, AddAddress);
router.put("/update/:id", authorize, UpdateAddress);
router.get("/get", authorize, GetAddress);
router.delete("/delete/:id", authorize, DeleteAddress);

module.exports = router;
