import Researcher from "../mongodb/models/researcher.js";
import mongoose from "mongoose";

const getAllResearchers = async (req, res) => {
  try {
    const researchers = await Researcher.find({}).limit(req.query._end);

    res.status(200).json(researchers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createResearcher = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const researcherExists = await Researcher.findOne({ email });

    if (researcherExists) return res.status(200).json(researcherExists);

    const newResearcher = await Researcher.create({ name, email, avatar });

    res.status(200).json(newResearcher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getResearcherInfoById = async (req, res) => {
  try {
    const { id } = req.params;

    const researcher = await Researcher.findOne({ _id: id }).populate(
      "allExperiments"
    ); //populate generates individual property objects based on ID from user model

    if (researcher) {
      res.status(200).json(researcher);
    } else {
      res.status(404).json({ message: "Researcher not found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllResearchers, createResearcher, getResearcherInfoById };
