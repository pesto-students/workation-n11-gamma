/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const bcrypt = require("bcrypt");
const async = require("async");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const Users = require("../database/config").Users;
const places = require("../database/config").places;
const cities = require("../database/config").cities;
const bookings = require("../database/config").bookings;

const modifyPassword = require("./modify_password");
const authorize = require("./authorize");

dotenv.config();
const secret = process.env.COOKIE_SECRET;

const Route = require("express").Router();
// Path to Signup
Route.post("/signup", modifyPassword, async (req, res) => {
  const {
    emailAddress: email,
    password,
    username,
    userType: usertype,
  } = req.body;
  const alreaydExists = await Users.where("email", "=", email).get();

  if (alreaydExists._size) {
    res.status(401).json({
      error: "User already exists !",
    });
  } else {
    try {
      await Users.add({ email, password, username, usertype });
      const currentUser = await Users.where("email", "=", email).get();
      if (!currentUser._size) {
        res.status(401).json({
          error: "User not created !",
        });
      } else {
        const user = currentUser.docs.map((doc) => {
          const userDetail = {
            data: doc.data(),
            id: doc.id,
          };
          return userDetail;
        })[0];

        const payload = { email, id: user?.id, username, usertype };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        const cookie = req.cookies.token;
        if (!cookie) {
          res.cookie("token", token, { httpOnly: true });
        }

        res.status(201).send({
          token,
          id: user?.id,
          username,
          usertype,
          email,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: "Server Error !",
      });
    }
  }
});

// Path to Login
Route.post("/login", async (req, res) => {
  const isCorrectPassword = function(password, thisPassword, callback) {
    bcrypt.compare(password, thisPassword, function(err, same) {
      if (err) {
        callback(err);
      } else {
        callback(err, same);
      }
    });
  };

  const { email, password, usertype } = req.body;
  const alreaydExists = await Users.where("email", "==", email)
    .where("usertype", "==", usertype)
    .get();
  if (!alreaydExists._size) {
    res.status(401).json({
      error: "User do not exists !",
    });
  } else {
    const user = alreaydExists.docs.map((doc) => {
      const userDetail = {
        data: doc.data(),
        id: doc.id,
      };
      return userDetail;
    })[0];

    const savedPassword = user?.data?.password;
    isCorrectPassword(password, savedPassword, (err, same) => {
      if (err) {
        res.status(500).json({
          error: "Internal server errror",
        });
      } else if (!same) {
        res.status(403).json({
          error: "Incorrect password",
        });
      } else {
        const payload = {
          email,
          id: user?.id,
          username: user?.data.username,
          usertype,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: "1h",
        });
        const cookie = req.cookies.token;
        if (!cookie) {
          res.cookie("token", token, { httpOnly: true });
        }

        res.status(201).send({
          token,
          id: user?.id,
          username: user?.data.username,
          usertype,
          email,
        });
      }
    });
  }
});

// Path to check user on every refresh
Route.get("/isAuth", async (req, res) => {
  const req_token = req.cookies.token;
  let auth = false;
  if (!req_token) {
    res.clearCookie("token");
    return res.status(401).send({
      message: "Please login",
    });
  }

  try {
    if (!jwt.verify(req_token, process.env.COOKIE_SECRET)) {
      throw "token not valid";
    } else {
      auth = true;
    }
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).send({
      message: "Invalide token",
    });
  }

  if (!auth) {
    res.clearCookie("token");
    return res.status(401).send({
      message: "token verification failed",
    });
  } else {
    const data = jwt.verify(req_token, process.env.COOKIE_SECRET);
    const dbUser = await Users.doc(`${data.id}`).get();
    if (!dbUser.exists) {
      return res.status(401).json({
        message: "token verification failed",
      });
    } else {
      res.status(201).send({
        token: req_token,
        id: data?.id,
        email: data?.email,
        usertype: data?.usertype,
        username: data?.username,
      });
    }
  }
});

// Path to Logout user
Route.post("/logout", (req, res) => {
  res.cookie("token", undefined);
  res.clearCookie("token");
  res.status(200).send({
    logout: true,
  });
});

// To list all the users for admin
Route.get("/loadAdminUsers", authorize, async (req, res) => {
  let usersList = [];
  await async.series(
    [
      async () => {
        const usersListObj = await Users.get();
        if (usersListObj._size) {
          await usersListObj.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            delete internalAddition.password;
            usersList = [...usersList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    async (err) => {
      if (err) {
        return res.status(402).send({ message: "Server Error" });
      }

      res.status(200).send(usersList);
    }
  );
});

// To list all the hotels for admin
Route.get("/loadAdminHotels", authorize, async (req, res) => {
  let hotelsList = [];
  await async.series(
    [
      async () => {
        const hotelsListObj = await places.get();
        if (hotelsListObj._size) {
          await hotelsListObj.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            delete internalAddition.password;
            hotelsList = [...hotelsList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    async (err) => {
      if (err) {
        return res.status(402).send({ message: "Server Error" });
      }
      res.status(200).send(hotelsList);
    }
  );
});

// To load all the cities for admin
Route.get("/loadAdminCities", authorize, async (req, res) => {
  let citiesList = [];
  await async.series(
    [
      async () => {
        const citiesListObj = await cities.get();
        if (citiesListObj._size) {
          await citiesListObj.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            delete internalAddition.password;
            citiesList = [...citiesList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    async (err) => {
      if (err) {
        return res.status(402).send({ message: "Server Error" });
      }
      res.status(200).send(citiesList);
    }
  );
});

// To load all the bookings for the admin
Route.get("/loadAdminBookings", authorize, async (req, res) => {
  let bookingsList = [];
  await async.series(
    [
      async () => {
        const bookingsListObj = await bookings.get();
        if (bookingsListObj._size) {
          await bookingsListObj.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            delete internalAddition.password;
            bookingsList = [...bookingsList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
      async () => {
        if (bookingsList.length) {
          await bookingsList.forEach(async (doc) => {
            if (doc?.placeId?._path?.segments?.length) {
              doc.placeId = doc?.placeId?._path?.segments[1].trim();
            }
          });
          return;
        } else {
          return;
        }
      },
      async () => {
        if (bookingsList.length) {
          await bookingsList.forEach(async (doc) => {
            if (doc?.userId?._path?.segments?.length) {
              doc.userId = doc?.userId?._path?.segments[1].trim();
            }
          });
          return;
        } else {
          return;
        }
      },
    ],
    async (err) => {
      if (err) {
        return res.status(402).send({ message: "Server Error" });
      }
      return await res.status(200).send(bookingsList);
    }
  );
});

module.exports = Route;
