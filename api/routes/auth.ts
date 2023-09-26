import express, { Router } from "express";
//controllers
import { verifyStudentId } from "../controllers/login.ts";
import {
	registerAdmin,
	verificationQuestions,
} from "../controllers/register.ts";
//middlewares
import { isSessionPresent } from "../middlewares/isSessionPresent.ts";
import { sendVerification } from "../middlewares/sendVerification.ts";
import { verify } from "../controllers/verify.ts";
import { getAdmin } from "../controllers/getAdmin.ts";

const router: Router = express.Router();

//login
router.post("/verify", verifyStudentId);

//register
router.post("/register", registerAdmin);
router.post("/add-questions", isSessionPresent, verificationQuestions);
router.post("/verify-code", isSessionPresent, verify);
router.get("/get-code", sendVerification);

//info
router.get("/info", getAdmin);

export { router as auth };
