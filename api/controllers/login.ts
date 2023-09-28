import { Request, Response } from "express";
import { db } from "../database/connect.ts";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
			return res.status(400).json({ message: "Admin not found!" });
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

export const enterPassword = async (req: Request, res: Response) => {
	const { student_id, password } = req.body;

	try {
		const admin = await db.query(
			`SELECT * FROM admin WHERE student_id = '${student_id}'`
		);

		if (admin.rows.length === 0) {
			return res.status(400).json({ message: "Student not found!" });
		}

		const match = await bcrypt.compare(password, admin.rows[0].password);

		if (!match) {
			return res.status(400).json({ message: "Incorrect password!" });
		}

		const payload: Payload = {
			session: uuid(),
			student_id,
			email: "",
			iat: new Date().getTime(),
		};

		//create a token using bcrypt.sign
		const token = jwt.sign(payload, "super-secret", { expiresIn: "1h" });

		res.status(200).json({
			message: "Login successful!",
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
