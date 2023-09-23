import express, { Router } from "express";
//controllers
import { verify } from "../controllers/login.ts";

const router: Router = express.Router();

router.post("/login", verify);

export { router as auth };
