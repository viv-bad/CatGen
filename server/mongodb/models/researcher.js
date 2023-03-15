import mongoose from "mongoose";

const ResearcherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allExperiments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experiment" }], //populate this with all property docs from property model
});

const researcherModel = mongoose.model("Researcher", ResearcherSchema);

export default researcherModel;
