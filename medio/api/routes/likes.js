import express from "express";
const router = express.Router();
import { getLikes, addLike, deleteLike } from "../controllers/like.js";

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

export default router;
