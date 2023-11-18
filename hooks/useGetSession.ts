export const useGetSession = () => {
	const setSession = (key: string, token: string) => {
		sessionStorage.setItem(key, token);
	};

	const getSession = (key: string) => {
		return sessionStorage.getItem(key);
	};

	const removeSession = (key: string) => {
		sessionStorage.removeItem(key);
	};

	return {
		setSession,
		getSession,
		removeSession,
	};
};
