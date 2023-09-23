import { createContext } from "react";
import { Admin } from "../../hooks/useAdmin";

interface AuthContext {
	admin: Admin | null;
	setAdmin: (admin: Admin | null) => void;
}

export const AuthContext = createContext<AuthContext>({
	admin: null,
	setAdmin: () => {},
});
