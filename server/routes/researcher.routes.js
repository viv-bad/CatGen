import express from "express";

// import your controllers here...
import {
  createResearcher,
  getAllResearchers,
  getResearcherInfoById,
} from "../controllers/researcher.controller.js";

const router = express.Router();

router.route("/").get(getAllResearchers);
router.route("/").post(createResearcher);
router.route("/:id").get(getResearcherInfoById);

export default router;
