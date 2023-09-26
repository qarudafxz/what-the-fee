import { Request, Response } from "express";
import { db } from "../database/connect.ts";
import { v4 as uuid } from "uuid";

type Payload = {
	session: string;
	student_id: string;
	email: string;
	iat: number;
};

export const verifyStudentId = async (req: Request, res: Response) => {
	const { stud_id } = req.body;
	console.log(stud_id);
	try {
		const student = await db.query(
			`SELECT student_id, email FROM admin WHERE student_id = '${stud_id}'`
		);

		if (student.rows.length === 0) {
			return res.status(400).json({ message: "Student not found!" });
		}

		const payload: Payload = {
			session: uuid(),
			student_id: student.rows[0].student_id,
			email: student.rows[0].email,
			iat: new Date().getTime(),
		};

		res.status(200).json({
			student: student.rows[0],
			message: "Student ID found. Moving to the next process...",
			payload,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// const enterPassword = (res: Response, res: Response) => {

// }
