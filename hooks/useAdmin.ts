import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { useLocalStorage } from "./useLocaleStorage";

export interface Admin {
	id: string;
	name: string;
	email: string;
	authToken?: string;
}

export const useAdmin = () => {
	const { admin, setAdmin } = useContext(AuthContext);
	const { setItem } = useLocalStorage();

	const addAdmin = (admin: Admin) => {
		setAdmin(admin);
		setItem("admin", JSON.stringify(admin));
	};

	const removeAdmin = () => {
		setAdmin(null);
		setItem("admin", "");
	};

	return { admin, addAdmin, removeAdmin };
};
