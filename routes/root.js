import express from "express";
import path from "path";

const router = express.Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;
