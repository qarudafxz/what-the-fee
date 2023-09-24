import { Request, Response } from "express";
import { db } from "../database/connect.ts";
import bcrypt from "bcrypt";

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
	const { first_name, last_name, student_id, email, password, position } =
		req.body;

	try {
		const studentAdmin = await db.query(
			`SELECT * FROM student WHERE student_id = '${student_id}'`
		);

		if (studentAdmin) {
			return res.status(400).json({ message: "Student already exists!" });
		}

		if (!email.includes("@carsu.edu.ph")) {
			return res.status(400).json({ message: "Please use your school email!" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newStudentAdmin = await db.query(
			`INSERT INTO student (student_id, first_name, middle_name, last_name, email, password, position)
			VALUES (''${student_id}', ${first_name}','' , '${last_name}', '${email}', '${hashedPassword}', '${position}')`
		);

		console.log(newStudentAdmin);

		res.status(200).json({ message: "Student Admin registered successfuly" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
