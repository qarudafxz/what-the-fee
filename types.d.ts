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
}
