import express from "express";
const router = express.Router();
import { getPosts, addPosts } from "../controllers/post.js";

router.get("/", getPosts);
router.post("/", addPosts);

export default router;
