import express, { Router } from "express";
//controllers
import { verifyStudentId } from "../controllers/login.ts";
import { registerAdmin } from "../controllers/register.ts";

const router: Router = express.Router();

//login
router.post("/verify", verifyStudentId);

//register
router.post("/register", registerAdmin);

export { router as auth };
