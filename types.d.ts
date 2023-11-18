declare global {
	interface ImportMeta {
		env: {
			PORT: string;
			DATABASE_USER: string;
			DATABASE_PASSWORD: string;
			DATABASE_HOST: string;
			DATABASE_PORT: string;
			DATABASE_NAME: string;
		};
	}

	type Student = {
		student_id: string;
		first_name: string;
		middle_name: string;
		last_name: string;
		email: string;
		program: string;
		year: number;
		role: string;
	};
}
