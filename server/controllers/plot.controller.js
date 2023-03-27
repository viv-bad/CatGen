import Plot from "../mongodb/models/plot.js";
import User from "../mongodb/models/user.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { application } from "express";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

app.use(fileUpload());

app.post("/upload", (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const createPlot = async (req, res) => {
  try {
    const { data } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    // const photoUrl = await cloudinary.uploader.upload(photo);

    const newData = await Plot.create({
      data,
    });

    // user.allExperiments.push(newExperiment._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPlot };
