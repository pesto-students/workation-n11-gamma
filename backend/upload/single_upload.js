const Route = require("express").Router();
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cities = require("../database/config").cities;
const async = require("async");

const { uploadFile, getFileStream } = require("./s3");

Route.get("/images/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

Route.post("/upload_single", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  const file = req.file;
  // console.log(file);

  // // apply filter
  // // resize

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
          return res.status(501).send({ message: "InternalServer Error" });
        }
        if (response) {
          await res.status(200).send("done");
        } else {
          await res.status(501).send({ message: "something bad on upload!" });
        }
      }
    );
  }
  // const description = req.body.description;
  // res.send({ imagePath: `/images/${result.Key}` });
  // res.send("ok");
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
