import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allExperiments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Experiment" }], //populate this with all property docs from property model
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
