export const buildUrl = (path: string): string => {
	const PORT = 8000;
	return import.meta.env.DEV
		? `http://localhost:${PORT}/api${path}`
		: `https://wtf-backend-production.up.railway.app/api${path}`;
};
