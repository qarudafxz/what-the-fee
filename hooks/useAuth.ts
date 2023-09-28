import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocaleStorage";
import { useGetSession } from "./useGetSession";

export const useAuth = (): boolean => {
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();

	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const adminID = getSession("student_id");
		const session = getSession("session");
		const token = getItem("token");
		return !!adminID && !!token && !!session;
	});

	useEffect(() => {
		const session = getSession("session");
		const adminID = getSession("student_id");
		const token = getItem("token");
		const authenticated = getItem("ok");

		if (adminID && token && session && authenticated) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [getSession, getItem]);

	return isLoggedIn;
};
