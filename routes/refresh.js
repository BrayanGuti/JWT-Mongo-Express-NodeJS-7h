import express from "express";
import refreshTokenController from "../controllers/refresh.controller.js";

const router = express.Router();

router.get("/", refreshTokenController);

export default router;
