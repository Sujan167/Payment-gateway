import { Router } from "express";
import { verifyKhalti, khaltiPayment } from "../controllers/khaltiController";
import { esewaPayment, verifyEsewa } from "../controllers/esewaController";
import { stripePayment } from "../controllers/stripeController";

const router = Router();

router.route("/khalti").post(khaltiPayment);
router.route("/verify-khalti").post(verifyKhalti);
router.route("/esewa").post(esewaPayment);
router.route("/veryfy-esewa").post(verifyEsewa);
router.route("/stripe").post(stripePayment);

export default router;
