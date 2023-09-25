export const useGetSession = () => {
	const setSession = (key: string, token: string) => {
		sessionStorage.setItem(key, token);
	};

	const getSession = (key: string) => {
		return sessionStorage.getItem(key);
	};

	return { setSession, getSession };
};
