/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocaleStorage";

export const EnterOtp: FC = () => {
	const navigate = useNavigate();
	const { getItem } = useLocalStorage();
	const token = getItem("token");

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token]);

	return <div>EnterOtp</div>;
};
