import { useEffect } from "react";
import { useAdmin, Admin } from "./useAdmin";
import { useLocalStorage } from "./useLocaleStorage";

export const useAuth = () => {
	const { admin, addAdmin, removeAdmin } = useAdmin();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		const admin = getItem("admin");
		if (admin) {
			addAdmin(JSON.parse(admin));
		}
	}, []);

	const login = (admin: Admin) => {
		addAdmin(admin);
	};

	const logout = () => {
		removeAdmin();
	};

	return { admin, login, logout };
};
