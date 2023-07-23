const express = require("express");
const authorize = require("../../middlewares/authorize");
const { AddOrder, GetOrders, DeleteOrder } = require("../../controllers/buyer");
const router = express.Router();

router.post("/", authorize, AddOrder);
router.get("/", authorize, GetOrders);
router.delete("/:id", authorize, DeleteOrder);

module.exports = router;
