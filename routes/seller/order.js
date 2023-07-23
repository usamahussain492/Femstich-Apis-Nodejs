const express = require("express");
const authorize = require("../../middlewares/authorize");
const { UpdateOrder, GetOrders, DeleteOrder } = require("../../controllers/seller");
const router = express.Router();

router.put("/:id/:status", authorize, UpdateOrder);
router.get("/", authorize, GetOrders);
router.delete("/:id", authorize, DeleteOrder);

module.exports = router;
