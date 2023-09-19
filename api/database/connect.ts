import Pool from "pg";

export const db = new Pool.Pool({
	user: process.env.DB_USER as string,
	host: process.env.DB_HOST as string,
	database: process.env.DB_NAME as string,
	password: (process.env.DB_PASSWORD as string) || "garuda06242008",
	port: parseInt((process.env.DB_PORT as string) || "5432"),
});
