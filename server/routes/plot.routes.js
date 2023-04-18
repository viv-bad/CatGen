import express from "express";

import {
  createPlot,
  deletePlot,
  getAllPlots,
  getPlotDetail,
  updatePlot,
} from "../controllers/plot.controller.js";

const router = express.Router();

router.route("/").get(getAllPlots);
router.route("/:id").get(getPlotDetail);
router.route("/").post(createPlot);
router.route("/:id").patch(updatePlot);
router.route("/:id").delete(deletePlot);

export default router;
