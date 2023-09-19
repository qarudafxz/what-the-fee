import express, { Router, Request } from "express";

const router: Router = express.Router();

router.post("/login", (req: Request) => {
	console.log(req.body.stud_id);
});

export { router as auth };
