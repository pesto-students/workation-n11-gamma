const Route = require("express").Router();
const Cities = require("../database/config").cities;
const places = require("../database/config").places;
const owners = require("../database/config").hotelOwners;
const landingvideo = require("../database/config").landingvideo;
const authorize = require("../auth_routes/authorize");
const async = require("async");
var nodemailer = require("nodemailer");
require("dotenv").config();

Route.post("/getSearchPlace", (req, res, next) => {
  let hotelsList = [];
  let cityResult = [];

  async.series(
    [
      async (cb) => {
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
      async (cb) => {
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
    (err, result) => {
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

Route.post("/isPlaceAvailable", (req, res, next) => {
  res.status(200).json({
    isAvailable: true,
  });
});

Route.post("/searchonfilter", (req, res, next) => {
  let hotelsList = [];
  let cityResult = [];

  async.series(
    [
      async (cb) => {
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
      async (cb) => {
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
    (err, result) => {
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

Route.post("/loadLandingPageData", (req, res, next) => {
  let cityResult = [];
  let landinVideoDataList = [];

  async.series(
    [
      async (cb) => {
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
      async (cb) => {
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
    (err, result) => {
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

Route.post("/loadHostLandingPageData", authorize, (req, res, next) => {
  if (req.id === req.body.userId) {
    let owenrsHotelResult = [];
    let ownersDataList = [];

    async.series(
      [
        async (cb) => {
          const ownersData = await owners.get();
          if (ownersData._size) {
            await ownersData.forEach(async (doc) => {
              const internalAddition = { ...doc.data(), id: doc.id };
              ownersDataList = [...ownersDataList, internalAddition];
            });
            return;
          } else {
            return;
          }
        },
        async (cb) => {
          if (ownersDataList.length) {
            await ownersDataList.forEach(async (doc) => {
              if (
                doc?.userId?._path?.segments &&
                doc.userId._path.segments.length
              ) {
                const localUserId = doc.userId._path.segments[1];
                if (req.body.userId === localUserId) {
                  owenrsHotelResult = [...owenrsHotelResult, doc];
                }
              }
            });
            return;
          } else {
            return cb;
          }
        },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(402).send({ message: "error" });
        }
        const finalList = {};
        if (owenrsHotelResult?.length) {
          finalList["ownerResult"] = owenrsHotelResult;
          res.status(200).send(finalList);
        } else {
          finalList["ownerResult"] = [];
          res.status(200).send(finalList);
        }
      }
    );
  } else {
    res.status(401).send({
      message: "not authenticated!",
    });
  }
});

Route.post("/loadHostHotelsPageData", authorize, (req, res, next) => {
  console.log(req.body, "loading");

  let owenrsHotelResult = [];
  let ownersDataObj = {};
  let hotelIds = [];
  async.series(
    [
      async (cb) => {
        const ownersData = await owners.doc(req.body.hotelId).get();
        if (ownersData) {
          ownersDataObj["hotel"] = ownersData.data();
          return;
        } else {
          return;
        }
      },
      async (cb) => {
        if (
          ownersDataObj &&
          ownersDataObj.hotel &&
          ownersDataObj.hotel?.hotels?.length
        ) {
          await ownersDataObj.hotel.hotels.forEach(async (doc) => {
            if (doc?._path?.segments && doc?._path?.segments?.length) {
              hotelIds = [...hotelIds, doc._path.segments[1]];
            }
          });
          return;
        } else {
          return cb;
        }
      },
      async (cb) => {
        if (hotelIds?.length) {
          await hotelIds.forEach(async (docid) => {
            let booking = await places.doc(docid).get();
            console.log(booking?._ref?._path);
          });
          return;
          // } else {
          //    return  }
        } else {
          return;
        }
      },
    ],
    (err, result) => {
      if (err) {
        return res.status(402).send({ message: "error" });
      }
      const finalList = {};
      if (owenrsHotelResult?.length) {
        finalList["ownerResult"] = owenrsHotelResult;
        res.status(200).send(finalList);
      } else {
        finalList["ownerResult"] = [];
        res.status(200).send(finalList);
      }
    }
  );
});

Route.post("/loadcitiesPageData", (req, res, next) => {
  let cityResult = [];
  async.series(
    [
      async (cb) => {
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
    (err, result) => {
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

Route.post("/loadHotelsPageData", (req, res, next) => {
  let ownersResult = [];
  async.series(
    [
      async (cb) => {
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
    (err, result) => {
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

  var smtpTransport2 = nodemailer.createTransport({
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
      async (cb) => {
        await smtpTransport.sendMail(mailOptions1, function (error, response) {
          if (error) {
            console.log(error);
            return "user mail not sent";
          } else {
            return;
          }
        });
      },
      async (cb) => {
        console.log("comming here to");
        await smtpTransport.sendMail(mailOptions2, function (error, response) {
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
