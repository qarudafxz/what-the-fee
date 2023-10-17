import express, { Router } from "express";
//controllers
import { verifyStudentId, enterPassword } from "../controllers/login.ts";
import {
	registerAdmin,
	verificationQuestions,
} from "../controllers/register.ts";
//middlewares
import { isSessionPresent } from "../middlewares/isSessionPresent.ts";
import { sendVerification } from "../middlewares/sendVerification.ts";
import { verify } from "../controllers/verify.ts";
import { getAdmin, getColleges } from "../controllers/getAdmin.ts";
import { validateChangePass } from "../middlewares/validateChangePass.ts";
import { changePassword } from "../controllers/changePassword.ts";

const router: Router = express.Router();

//login
router.post("/verify", verifyStudentId);
router.post("/login", enterPassword);

//register
router.post("/register", registerAdmin);
router.post("/add-questions", isSessionPresent, verificationQuestions);
router.post("/verify-code", isSessionPresent, verify);
router.get("/get-colleges", getColleges);
router.get("/get-code", sendVerification);

//info
router.get("/info", getAdmin);

//change password
router.put("/change-password", validateChangePass, changePassword);

export { router as auth };
