import express from "express";
import {
  addData,
  getAllCategoryNames,
  getRandomData,
} from "./data/dataController.js";

const router = express.Router();

// Define a route to add data to the Firestore database
router.post("/addData", addData);

router.get("/getRandomData", getRandomData);

router.get("/getAllCategoryNames", getAllCategoryNames);

export default router;
