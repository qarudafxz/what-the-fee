import express, { Router } from "express";
//controllers
import { verifyStudentId } from "../controllers/login.ts";

const router: Router = express.Router();

router.post("/verify", verifyStudentId);

export { router as auth };
