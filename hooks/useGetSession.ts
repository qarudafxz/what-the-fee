import { useState, useEffect } from "react";

export const useGetSession = () => {
	const [token, setToken] = useState<string | null>("");
	useEffect(() => {
		return () => {
			setToken(document.cookie);
		};
	}, []);
	return { token };
};
