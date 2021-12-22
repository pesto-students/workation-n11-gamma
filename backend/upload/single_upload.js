const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const async = require("async");

const upload = multer({ dest: "uploads/" });
const cities = require("../database/config").cities;
const places = require("../database/config").places;
const owners = require("../database/config").hotelOwners;

const { uploadFile, getFileStream } = require("./s3");
const { Users, fieldValue } = require("../database/config");

const Route = require("express").Router();

// Not using for now use for downloading image/document
Route.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

// To upload from Admin side cities
Route.post("/upload_single", upload.single("image"), async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  await unlinkFile(file.path);
  if (result) {
    let response;
    await async.series(
      [
        async () => {
          const location = result?.Location;
          response = await cities.add({
            name: req.body.name,
            description: req.body.description,
            city_image: location,
            placeLocation: {
              Latitude: req.body.latitude,
              Longitude: req.body.longitude,
            },
          });
        },
      ],
      async (err) => {
        if (err) {
          return res.status(200).send({ message: "InternalServer Error" });
        }
        if (response) {
          await res.status(200).send("done");
        } else {
          await res.status(200).send({ message: "something bad on upload!" });
        }
      }
    );
  } else {
    await res.status(200).send({ message: "something bad on upload!" });
  }
});

// upload hotels from host
Route.post("/upload_hotel", upload.single("image"), async (req, res) => {
  const file = req.file;
  const amaneties = req.body?.amaneties?.split(",");
  const result = await uploadFile(file);
  await unlinkFile(file.path);

  let userId = req.body.userId;
  if (result) {
    let response;
    let placeId;
    let ownerId;
    let ownerData = [];
    await async.series(
      [
        async () => {
          const location = result?.Location;
          response = await places.add({
            name: req.body.hotelname,
            description: req.body.description,
            city: req.body.cityname,
            hotel_image: location,
            price: req.body.priceperservice,
            available: {
              from: req.body.fromDate,
              to: req.body.toDate,
            },
            subarea: req.body.subarea,
            placeLocation: {
              Latitude: req.body.latitude,
              Longitude: req.body.longitude,
            },
            placeAddress: req.body.fullAdress,
            placeType: req.body.placetype,
            amaneties,
          });
        },
        async () => {
          if (response && response?._path?.segments?.length) {
            placeId = response._path.segments[1];
          }
        },
        async () => {
          const ownerInfo = await owners
            .where("userId", "==", Users.doc(userId))
            .get();
          if (ownerInfo._size) {
            await ownerInfo.forEach(async (doc) => {
              const internalAddition = { ...doc.data(), id: doc.id };
              ownerData = [...ownerData, internalAddition];
            });
          } else {
            ownerId = await owners.add({
              hotels: [places.doc(placeId)],
              userId: Users.doc(userId),
            });
          }
        },
        async () => {
          if (ownerData?.length) {
            const ownerDataDoc = ownerData[0];
            ownerId = ownerDataDoc.id;
            await owners.doc(ownerId).update({
              hotels: fieldValue.arrayUnion(places.doc(placeId)),
            });
          } else {
            return;
          }
        },
        async () => {
          if (typeof ownerId === "object") {
            ownerId = ownerId?._path?.segments[1];
          }
          if (ownerId) {
            await places.doc(placeId).set(
              {
                owner: owners.doc(ownerId),
              },
              {
                merge: true,
              }
            );
          } else {
            return;
          }
        },
      ],
      async (err) => {
        if (err) {
          console.log(err);
          return res.status(200).send({ message: "InternalServer Error" });
        }
        if (response) {
          await res.status(200).send("done");
        } else {
          await res.status(200).send({ message: "something bad on upload!" });
        }
      }
    );
  } else {
    return res.status(200).send({ message: "InternalServer Error" });
  }
});

module.exports = Route;
