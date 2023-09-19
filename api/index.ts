import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { db } from "./database/connect.ts";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("tiny"));
app.disable("x-powered-by");

try {
	db.connect().then(() => console.log("Connected to database"));
} catch (err) {
	throw new Error("Failed to connect to database");
}

app.listen(process.env.PORT || 4000, () => {
	console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
