/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const { bookings, places, fieldValue, Users } = require("../database/config");
const crypto = require("crypto");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const recieptNumber = `receipt_order_${Math.random(99999)}`;
    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: recieptNumber,
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/success", async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      amount,
      toDate,
      fromDate,
      numberOfDays,
      userId,
      hotelId,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");
    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
    const bookingData = await bookings.add({
      amount: amount,
      checkin: fromDate,
      checkout: toDate,
      placeId: places.doc(hotelId),
      userId: Users.doc(userId),
      numberOfDays,
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
    });

    await places.doc(hotelId).set(
      {
        bookings: fieldValue.arrayUnion(
          bookings.doc(bookingData?._path?.segments[1])
        ),
      },
      { merge: true }
    );

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      data: req.body,
      bookingId: bookingData?._path?.segments[1],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
