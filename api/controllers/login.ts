import { Request, Response, NextFunction } from "express";
import { db } from "../database/connect.ts";

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { stud_id } = req.body;
	console.log(stud_id);
	try {
		const student_admin = await db.query(
			`SELECT * FROM student WHERE student_id = "${stud_id}"`
		);

		if (!student_admin) {
			return res.status(400).json({ message: "Student not found!" });
		}

		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
