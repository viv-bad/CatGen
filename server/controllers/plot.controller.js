import express from "express";
import Plot from "../mongodb/models/plot.js";
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";

const app = express();

const getAllPlots = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    title_like = "",
    experimentType = "",
    //add filtering by code?
  } = req.query;

  const query = {};

  if (experimentType !== "") {
    query.experimentType = experimentType;
  }
  if (title_like) {
    query.title = { $regex: title_like, $options: "i" }; //case insentitive 'i'
  }
  try {
    const count = await Plot.countDocuments({ query });

    const plots = await Plot.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(plots);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getPlotDetail = async (req, res) => {
  const { id } = req.params;
  const plotExists = await Plot.findOne({ _id: id }).populate("creator");

  if (plotExists) {
    res.status(200).json(plotExists);
  } else {
    res.status(404).json({ message: "Plot not found" });
  }
  // try {
  //   const id = req.params.id;
  //   // console.log(id);
  //   const data = await Plot.findById(id);
  //   res.send(data);
  // } catch (err) {
  //   res.send(err);
  // }
};

// app.get("/plots/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(id);
//     const data = await Plot.findById(id);
//     res.send(data);
//   } catch (err) {
//     res.send(err);
//   }
// });

const createPlot = async (req, res) => {
  try {
    const {
      title,
      code,
      description,
      experimentType,
      location,
      date,
      email,
      rating,
      x,
      y,
      xAxisLabel,
      yAxisLabel,
    } = req.body;
    // console.log(email);
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const newPlot = await Plot.create({
      title,
      code,
      description,
      experimentType,
      location,
      date,
      rating,
      x,
      y,
      xAxisLabel,
      yAxisLabel,
      creator: user._id,
    });

    user.allPlots.push(newPlot._id);
    await user.save({ session });
    await session.commitTransaction();
    res.status(200).json({ message: "Plot created successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePlot = async (req, res) => {
  try {
    const id = req.params.id;

    const plotToDelete = await Plot.findByIdAndDelete(id).populate("creator");
    // console.log(response);
    if (!plotToDelete) throw new Error("Plot not found");

    const session = await mongoose.startSession();
    session.startTransaction();
    plotToDelete.deleteOne({ session });
    plotToDelete.creator.allPlots.pull(plotToDelete);

    await plotToDelete.creator.save({ session });

    await session.commitTransaction();
    res.status(200).json({ message: "Plot deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlot = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      code,
      description,
      experimentType,
      date,
      location,
      rating,
      xAxisLabel,
      yAxisLabel,
      x,
      y,
    } = req.body;

    await Plot.findByIdAndUpdate(
      { _id: id },
      {
        title,
        code,
        description,
        experimentType,
        date,
        location,
        rating,
        xAxisLabel,
        yAxisLabel,
        x,
        y,
      }
    );

    res.status(200).json({ message: "Plot successfully updated." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllPlots, createPlot, getPlotDetail, updatePlot, deletePlot };
