import { Request, Response } from "express";
import { db } from "../database/connect.ts";
// import bcrypt from "bcrypt";
// import { v4 as uuid } from "uuid";

// type Payload = {
// 	id: string;
// 	student_id: string;
// 	email: string;
// 	iat: number;
// };

export const verify = async (req: Request, res: Response) => {
	const { stud_id } = req.body;
	console.log(stud_id);
	try {
		const student = await db.query(
			`SELECT * FROM student WHERE student_id = '${stud_id}'`
		);

		if (!student) {
			return res.status(400).json({ message: "Student not found!" });
		}

		// const payload: Payload = {
		// 	id: uuid(),
		// 	student_id: student.rows[0].student_id,
		// 	email: student.rows[0].email,
		// 	iat: new Date().getTime(),
		// };

		// res.cookie("student_id", payload.student_id, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	sameSite: "none",
		// });

		res.status(200).json({
			student,
			message: "Student ID found. Moving to the next process...",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
