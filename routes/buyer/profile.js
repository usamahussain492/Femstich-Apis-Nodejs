const express = require("express");
const authorize = require("../../middlewares/authorize");
const {
  ChangeImage,
  ChangeDetails,
  ChangePassword,
  ContactUs,
  LikeUser,
  DislikeUser,
  GetFavoriteUsers,
  GetProfile,
} = require("../../controllers/buyer");
const multer = require("../../utils/multer");
const router = express.Router();

router.post(
  "/image",
  authorize,
  multer.single("image"),
  authorize,
  ChangeImage
);
router.put("/change-details", authorize, ChangeDetails);
router.put("/change-password", authorize, ChangePassword);
router.post("/contact-us", authorize, ContactUs);
router.put("/like-user/:id", authorize, LikeUser);
router.put("/dislike-user/:id", authorize, DislikeUser);
router.get("/favorites-user", authorize, GetFavoriteUsers);
router.get("/", authorize, GetProfile);

module.exports = router;
