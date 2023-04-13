import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import Plot from "../mongodb/models/plot.js";

// require("dotenv").config();

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(cors());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// const uri = `${process.env.DB_URI}`;

// mongoose.connect(uri);

const getAllPlots = async (req, res) => {
  try {
    const data = await Plot.find({}).sort({ createdAt: -1 });
    res.send(data);
    // console.log(data);
  } catch (err) {
    console.log(err);
  }
};

// app.get("/plots", async (req, res) => {
//   try {
//     const data = await Plot.find({}).sort({ createdAt: -1 });
//     res.send(data);
//     // console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

const getPlotDetail = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await Plot.findById(id);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
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
  const data = req.body;
  const newData = new Plot(data);

  await newData.save();
  // console.log(newData);
  res.json(newData);

  // console.log("Create data");
};

// app.post("/createPlot", async (req, res) => {
//   const data = req.body;
//   const newData = new Plot(data);

//   await newData.save();
//   // console.log(newData);
//   res.json(newData);

//   // console.log("Create data");
// });

const deletePlot = async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Plot.findByIdAndDelete(id);
    // console.log(response);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

// app.delete("/deletePlot/:id", async (req, res) => {
//   try {
//     const id = req.params.id;

//     const response = await Plot.findByIdAndDelete(id);
//     // console.log(response);
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

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

// app.patch("/updatePlot/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       title,
//       code,
//       description,
//       experimentType,
//       date,
//       location,
//       rating,
//       xAxisLabel,
//       yAxisLabel,
//       x,
//       y,
//     } = req.body;

//     await Plot.findByIdAndUpdate(
//       { _id: id },
//       {
//         title,
//         code,
//         description,
//         experimentType,
//         date,
//         location,
//         rating,
//         xAxisLabel,
//         yAxisLabel,
//         x,
//         y,
//       }
//     );

//     res.status(200).json({ message: "Plot successfully updated." });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// });

export { getAllPlots, createPlot, getPlotDetail, updatePlot, deletePlot };
