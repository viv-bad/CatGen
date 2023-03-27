import express from "express";

import { createPlot } from "../controllers/experiment.controller.js";

const router = express.Router();

// router.route("/").get(getAllExperiments);
// router.route("/:id").get(getExperimentDetail);
router.route("/").post(createPlot);
// router.route("/:id").patch(updateExperiment);
// router.route("/:id").delete(deleteExperiment);

export default router;
