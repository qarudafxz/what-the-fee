import express, { Router } from "express";
//controllers
import { login } from "../controllers/login.ts";

const router: Router = express.Router();

router.post("/login", login);

export { router as auth };
