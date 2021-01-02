import express from "express";
import paymentController from "../../controllers/payment.controller";
const router = express.Router();

router.get("/", paymentController.getAllPayments);

export default router;
