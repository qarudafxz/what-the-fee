import Pool from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool.Pool({
	user: process.env.DATABASE_USERNAME as string,
	host: process.env.DATABASE_HOST as string,
	database: process.env.DATABASE_NAME as string,
	password: process.env.DATABASE_PASSWORD as string,
	port: parseInt((process.env.DATABASE_PORT as string) || "5432"),
});
