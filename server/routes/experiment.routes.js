import express from "express";

import {
  createExperiment,
  deleteExperiment,
  getAllExperiments,
  getExperimentDetail,
  updateExperiment,
} from "../controllers/experiment.controller.js";

const router = express.Router();

router.route("/").get(getAllExperiments);
router.route("/:id").get(getExperimentDetail);
router.route("/").post(createExperiment);
router.route("/:id").patch(updateExperiment);
router.route("/:id").delete(deleteExperiment);

export default router;
