import mongoose from "mongoose";

const PlotSchema = new Schema({
  data: { type: Object },
});

const plotModel = mongoose.model("Plot", PlotSchema);

export default plotModel;
