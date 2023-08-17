import express from "express";
const router = express.Router();
import { getComments, addComment } from "../controllers/comment.js";

router.get("/", getComments);
router.post("/", addComment);

export default router;
