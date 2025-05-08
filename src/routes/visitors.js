import express from "express";
import { handleVisitor } from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", handleVisitor);

export default router;
