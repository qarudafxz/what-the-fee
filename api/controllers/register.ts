import { Request, Response } from "express";
import { db } from "../database/connect.ts";
import bcrypt from "bcrypt";
import { v4 } from "uuid";

export const register = async (req: Request, res: Response) => {
	const {
		student_id,
		password,
		first_name,
		middle_name,
		last_name,
		email,
		program,
		year,
		balance,
		role,
	} = req.body;

	try {
		const student = await db.query(
			`SELECT * FROM student WHERE student_id = "${student_id}"`
		);

		if (student) {
			return res.status(400).json({ message: "Student already exists!" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStudent = await db.query(
			`INSERT INTO student (student_id, password, first_name, middle_name, last_name, email, program, year, balance, role)
   VALUES ('${student_id}', '${hashedPassword}','${first_name}', '${middle_name}', '${last_name}', '${email}', '${program}', '${year}', '${balance}', '${role}')`
		);

		console.log(newStudent);

		res.status(200).json({ message: "Student registered successfuly" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

export const registerAdmin = async (req: Request, res: Response) => {
	try {
		const { first_name, last_name, student_id, email, password, position } =
			req.body;

		if (
			!first_name ||
			!last_name ||
			!student_id ||
			!email ||
			!password ||
			!position
		) {
			return res.status(400).json({ message: "All fields are required." });
		}

		if (!email.endsWith("@carsu.edu.ph")) {
			return res.status(400).json({ message: "Please use your school email!" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStudentAdmin = await db.query(
			"INSERT INTO admin (student_id, first_name, last_name, email, password, position, role, isverified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING student_id, email",
			[
				student_id,
				first_name,
				last_name,
				email,
				hashedPassword,
				position,
				"super",
				false,
			]
		);

		const sessionToken = v4();

		res.status(200).json({
			message: "Student Admin registered successfully",
			token: sessionToken,
			admin: newStudentAdmin.rows[0],
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Student admin already exists" });
	}
};

export const verificationQuestions = async (req: Request, res: Response) => {
	const { student_id, questions } = req.body;

	try {
		await db.query(
			"INSERT INTO questions (student_id, json) VALUES ($1, $2) RETURNING *",
			[student_id, questions]
		);

		res
			.status(200)
			.json({ message: "Verification questions saved successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
