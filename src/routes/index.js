const express = require("express");
const userRoute = require("./user/user.route");
const formQuriesRoute = require("./form_quries/form_quries.route");
const modelRoute = require("./model/model.route");
const paymentDetailsRoute = require("./payment/paymentDetails.route");
const addressDetailsRoute = require("./addressDetails/addressDetails.route");
const authRoute = require("./auth/auth.route");
const showRoomRoute = require("./showRoom/showRoom.route");
const commentRoute = require("./comment/comment.route");
const postRoute = require("./post/post.route");
const reviewRoute = require("./review/review.route");
const replyRoute = require("./reply/reply.route");
const voteRoute = require("./vote/vote.route");
const colourRoute = require("./colour/colour.route");
const notificationRoute = require("./notification/notification.route");
const brandRoute = require("./brand/brand.route");
const notificationTokenRoute = require("./notification/notificationToken.route");
const notificationDetailRoute = require("./notification/notificationDetails.route");
const wishlistRoute = require("./wishlist/wishlist.route");
const chatRoute = require("./chat/chat.route");
const cartRoute = require("./cart/cart.route");
const paymentRoute = require("./payment/payment.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/form_quries", formQuriesRoute);
router.use("/model", modelRoute);
router.use("/paymentDetail", paymentDetailsRoute);
router.use("/addressDetail", addressDetailsRoute);
router.use("/showroom", showRoomRoute);
router.use("/comment", commentRoute);
router.use("/post", postRoute);
router.use("/review", reviewRoute);
router.use("/reply", replyRoute);
router.use("/vote", voteRoute);
router.use("/colour", colourRoute);
router.use("/notification-token", notificationTokenRoute);
router.use("/notification-detail", notificationDetailRoute);
router.use("/notification", notificationRoute);
router.use("/brand", brandRoute);
router.use("/wishlist", wishlistRoute);
router.use("/chat", chatRoute);
router.use("/cart", cartRoute);
router.use("/payment", paymentRoute);

// router.use("affiliation");

module.exports = router;
