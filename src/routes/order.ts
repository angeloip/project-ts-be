import { Router } from "express";
import { orderController } from "../controllers/order";
import { checkJwt } from "../middlewares/session";

const router = Router();

router.get("/", checkJwt, orderController.getItems);

export { router };
