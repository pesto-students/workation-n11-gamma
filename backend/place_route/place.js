/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Route = require("express").Router();
const Cities = require("../database/config").cities;
const places = require("../database/config").places;
const owners = require("../database/config").hotelOwners;
const booking = require("../database/config").bookings;
const landingvideo = require("../database/config").landingvideo;
const authorize = require("../auth_routes/authorize");
const async = require("async");
var nodemailer = require("nodemailer");
require("dotenv").config();

Route.post("/getSearchPlace", (req, res) => {
  let hotelsList = [];
  let cityResult = [];

  async.series(
    [
      async () => {
        const ownersInCity = await owners
          .where("city", "==", req.body.city)
          .get();
        if (ownersInCity._size) {
          await ownersInCity.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            hotelsList = [...hotelsList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
      async () => {
        const cityDetails = await Cities.where(
          "name",
          "==",
          req.body.city
        ).get();
        if (cityDetails._size === 1) {
          await cityDetails.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            cityResult = [...cityResult, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    (err) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }

      if (cityResult?.length) {
        if (hotelsList?.length) {
          cityResult[0].hotelsList = [...hotelsList];
        } else {
          cityResult[0].hotelsList = [];
        }
        res.status(200).send(cityResult);
      } else {
        res.status(403).send({
          message: "no data found",
        });
      }
    }
  );
});

Route.post("/isPlaceAvailable", (_req, res) => {
  res.status(200).json({
    isAvailable: true,
  });
});

Route.post("/searchonfilter", (req, res) => {
  let hotelsList = [];
  let cityResult = [];

  async.series(
    [
      async () => {
        const ownersInCity = await owners
          .where("subarea", "==", req.body.subarea)
          .get();
        if (ownersInCity._size) {
          await ownersInCity.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            hotelsList = [...hotelsList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
      async () => {
        const cityDetails = await Cities.where(
          "name",
          "==",
          req.body.city
        ).get();
        if (cityDetails._size === 1) {
          await cityDetails.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            cityResult = [...cityResult, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    (err) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }

      if (cityResult?.length) {
        if (hotelsList?.length) {
          cityResult[0].hotelsList = [...hotelsList];
          cityResult[0].hotelsList.length = 1;
        } else {
          cityResult[0].hotelsList = [];
        }
        res.status(200).send(cityResult);
      } else {
        res.status(403).send({
          message: "no data found",
        });
      }
    }
  );
});

Route.post("/loadLandingPageData", (_req, res) => {
  let cityResult = [];
  let landinVideoDataList = [];

  async.series(
    [
      async () => {
        const landinVideoData = await landingvideo.get();
        if (landinVideoData._size) {
          await landinVideoData.forEach(async (doc) => {
            const internalAddition = { ...doc.data(), id: doc.id };
            landinVideoDataList = [...landinVideoDataList, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
      async () => {
        const cityDetails = await Cities.get();
        if (cityDetails._size) {
          await cityDetails.forEach(async (doc) => {
            const internalAddition = {
              name: doc.data().name,
              id: doc.id,
              image_url: doc.data().city_image,
            };
            cityResult = [...cityResult, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    (err) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }
      const finalList = {};
      if (landinVideoDataList?.length) {
        finalList["video_data"] = landinVideoDataList;
      }

      if (cityResult?.length) {
        finalList["cityResult"] = cityResult.splice(0, 4);
        res.status(200).send(finalList);
      } else {
        res.status(403).send({
          message: "no data found",
        });
      }
    }
  );
});

async function returnHotels(_req, res, data) {
  let tempArray = [];
  await async.eachSeries(data, async (id, cb) => {
    const placeHotel = await places.doc(id).get();
    tempArray.push({ data: placeHotel.data(), id });
  });
  await res.status(200).send(tempArray);
}

Route.post("/loadHostLandingPageData", authorize, (req, res) => {
  if (req.id === req.body.userId) {
    let owenrsHotelResult = [];
    let ownersDataList = [];
    let hotelsList = [];
    async.series(
      [
        async () => {
          const ownersData = await owners.get();
          if (ownersData._size) {
            await ownersData.forEach(async (doc) => {
              const internalAddition = { ...doc.data(), id: doc.id };
              ownersDataList.push(internalAddition);
            });
            return;
          } else {
            return;
          }
        },
        async () => {
          if (ownersDataList.length) {
            await ownersDataList.forEach(async (doc) => {
              if (
                doc?.userId?._path?.segments &&
                doc.userId._path.segments.length
              ) {
                const localUserId = doc.userId._path.segments[1];
                if (req.body.userId === localUserId) {
                  owenrsHotelResult.push(doc);
                }
              }
            });
            return;
          } else {
            return;
          }
        },
        async () => {
          if (owenrsHotelResult.length) {
            await owenrsHotelResult.forEach(async (doc) => {
              if (doc?.hotels?.length) {
                await doc?.hotels.forEach(async (hotel) => {
                  if (hotel?._path?.segments?.length) {
                    hotelsList.push(hotel?._path?.segments[1]);
                  }
                });
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
          console.log(err);
          return res.status(402).send({ message: "error" });
        }
        if (hotelsList?.length) {
          return await returnHotels(req, res, hotelsList);
        }
      }
    );
  } else {
    res.status(401).send({
      message: "not authenticated!",
    });
  }
});

async function returnBookings(_req, res, hotelObj, bookingIds) {
  let tempArray = [];
  await async.eachSeries(bookingIds, async (id, cb) => {
    const bookingData = await booking.doc(id).get();
    tempArray.push({ data: bookingData.data(), id });
  });
  hotelObj.hotel.bookings = tempArray;
  await res.status(200).send(hotelObj);
}

Route.post("/loadHostHotelsPageData", authorize, (req, res) => {
  let owenrsHotelResult = [];
  let hotelDataObj = {};
  let bookingIds = [];
  let bookings = [];
  async.series(
    [
      async () => {
        const hotelData = await places.doc(req.body.hotelId).get();
        hotelDataObj["hotel"] = hotelData.data();
        return;
      },
      async () => {
        if (hotelDataObj?.hotel?.bookings?.length) {
          await hotelDataObj.hotel.bookings.forEach(async (doc) => {
            if (doc?._path?.segments && doc?._path?.segments?.length) {
              bookingIds.push(doc._path.segments[1]);
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
        return res.status(402).send({ message: "error" });
      }

      return await returnBookings(req, res, hotelDataObj, bookingIds);
    }
  );
});

Route.post("/loadcitiesPageData", (req, res) => {
  let cityResult = [];
  async.series(
    [
      async () => {
        const cityDetails = await Cities.get();
        if (cityDetails._size) {
          await cityDetails.forEach(async (doc) => {
            const internalAddition = {
              name: doc.data().name,
              id: doc.id,
              image_url: doc.data().city_image,
            };
            cityResult = [...cityResult, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    (err) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }
      const finalList = {};

      if (cityResult?.length) {
        finalList["cities"] = cityResult.splice(req.body.from, req.body.to);
        finalList["from"] = req.body.from;
        finalList["to"] = req.body.to;
        if (req.body.from > cityResult.length) {
          return res.status(403).send({ message: " no more data" });
        }
        res.status(200).send(finalList);
      } else {
        res.status(403).send({
          message: "no data found",
        });
      }
    }
  );
});

Route.post("/loadHotelsPageData", (req, res) => {
  let ownersResult = [];
  async.series(
    [
      async () => {
        const ownersDetails = await owners.get();
        if (ownersDetails._size) {
          await ownersDetails.forEach(async (doc) => {
            const internalAddition = {
              city: doc.data().city,
              id: doc.id,
              hotel_image: doc.data().hotel_image,
              hotel_name: doc.data().hotel_name,
            };
            ownersResult = [...ownersResult, internalAddition];
          });
          return;
        } else {
          return;
        }
      },
    ],
    (err) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }
      const finalList = {};

      if (ownersResult?.length) {
        finalList["hotels"] = ownersResult.splice(req.body.from, req.body.to);
        finalList["from"] = req.body.from;
        finalList["to"] = req.body.to;
        if (req.body.from > ownersResult.length) {
          return res.status(403).send({ message: " no more data" });
        }
        res.status(200).send(finalList);
      } else {
        res.status(403).send({
          message: "no data found",
        });
      }
    }
  );
});

Route.post("/form-submit-url", (req, res) => {
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const template1 = `
      <div>
         <h1>Hii ${req.body.name}, </h1>
         <div>
              You have submitted your query with details as:
              <div>
                 ${req.body.message}
              </div>
         </div>
      </div>
    `;
  var mailOptions1 = {
    from: "workationpesto@gmail.com",
    to: req.body.email,
    subject: "WORKATION_QUERY",
    html: template1,
  };

  const template2 = `
      <div>
         <h1>Hii WorkationPesto, </h1>
         <div>
              <h4>${req.body.name},</h4>
              have submitted a query with details as:
              <div>
                 ${req.body.message}
              </div>
         </div>
      </div>
    `;
  var mailOptions2 = {
    from: "workationpesto@gmail.com",
    to: process.env.NODEMAILER_USER,
    subject: "WORKATION_QUERY",
    html: template2,
  };

  async.series(
    [
      async () => {
        await smtpTransport.sendMail(mailOptions1, function(error) {
          if (error) {
            console.log(error);
            return "user mail not sent";
          } else {
            return;
          }
        });
      },
      async () => {
        console.log("comming here to");
        await smtpTransport.sendMail(mailOptions2, function(error) {
          if (error) {
            console.log(error);
            return " mail not sent to workation";
          } else {
            return;
          }
        });
      },
    ],
    (err) => {
      if (err) {
        return res.status(400).send({ message: err });
      } else {
        res.status(200).send({ message: "successfully sent" });
      }
    }
  );
});
/**
 * Description: Sample for authorization working on both side,
 * Author: Rishabh Verma
 * Warning: Please dont remove the below code
 */
// Route.post("/register",authorize, (req,res,next)=>{
//     res.status(200).json({
//         isAvailable : true
//     })
// })

module.exports = Route;
