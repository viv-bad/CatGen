import mongoose from "mongoose";

const ExperimentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  experimentType: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  photo: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5 },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const experimentModel = mongoose.model("Experiment", ExperimentSchema);

export default experimentModel;
