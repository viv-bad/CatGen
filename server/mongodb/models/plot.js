// const mongoose = require("mongoose");
import mongoose from "mongoose";

const PlotSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    experimentType: { type: String, default: "exploratory" },
    location: { type: String, required: true },
    date: { type: Date },
    xAxisLabel: { type: String },
    yAxisLabel: { type: String },
    x: Array,
    y: Array,
    rating: { type: Number, min: 0, max: 5 },
    // creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const plotModel = mongoose.model("plot", PlotSchema);

// module.exports = PlotModel;
export default plotModel;
