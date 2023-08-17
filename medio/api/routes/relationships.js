import express from "express";
const router = express.Router();
import {
  getRelationship,
  addRelationship,
  deleteRelationship,
} from "../controllers/relationship.js";

router.get("/", getRelationship);
router.post("/", addRelationship);
router.delete("/", deleteRelationship);

export default router;
