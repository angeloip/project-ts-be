import { Router } from "express";
import { multerMiddleware } from "../middlewares/file";
import { uploadController } from "../controllers/upload";
import { uploadsFolder } from "../middlewares/uploadsFolder";

const router = Router();

router.post("/", uploadsFolder, multerMiddleware, uploadController.getFile);

export { router };
