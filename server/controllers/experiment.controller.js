import Experiment from "../mongodb/models/experiment.js";
import Researcher from "../mongodb/models/researcher.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllExperiments = async (req, res) => {
  // fetach all properties based on pagination/filtering etc...
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    experimentType = "",
  } = req.query;

  const query = {};

  if (experimentType !== "") {
    query.experimentType = experimentType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" }; //case insentitive 'i'
  }
  try {
    const count = await Experiment.countDocuments({ query });

    const experiments = await Experiment.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(experiments);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const getExperimentDetail = async (req, res) => {
  const { id } = req.params;
  const experimentExists = await Experiment.findOne({ _id: id }).populate(
    "creator"
  );

  if (experimentExists) {
    res.status(200).json(experimentExists);
  } else {
    res.status(404).json({ message: "Experiment not found" });
  }
};

const createExperiment = async (req, res) => {
  try {
    const {
      title,
      code,
      description,
      experimentType,
      location,
      date,
      photo,
      email,
    } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const researcher = await Researcher.findOne({ email }).session(session);

    if (!researcher) throw new Error("Researcher not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newExperiment = await Experiment.create({
      title,
      code,
      description,
      experimentType,
      location,
      date,
      photo: photoUrl.url,
      creator: researcher._id,
    });

    researcher.allExperiments.push(newExperiment._id);
    await researcher.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Experiment created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, code, description, experimentType, location, date, photo } =
      req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Experiment.findByIdAndUpdate(
      { _id: id },
      {
        title,
        code,
        description,
        experimentType,
        location,
        date,
        photo: photoUrl.url || photo,
      }
    );

    res.status(200).json({ message: "Experiment updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExperiment = async (req, res) => {
  try {
    const { id } = req.params;
    const experimentToDelete = await Experiment.findById({ _id: id }).populate(
      "creator"
    );

    if (!experimentToDelete) throw new Error("Experiment not found");

    const session = await mongoose.startSession();
    session.startTransaction();
    experimentToDelete.deleteOne({ session });
    experimentToDelete.creator.allExperiments.pull(experimentToDelete);

    await experimentToDelete.creator.save({ session });

    await session.commitTransaction();
    res.status(200).json({ message: "Experiment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllExperiments,
  createExperiment,
  getExperimentDetail,
  updateExperiment,
  deleteExperiment,
};
