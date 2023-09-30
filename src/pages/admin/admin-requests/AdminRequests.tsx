import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";

export const AdminRequests: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	useEffect(() => {
		document.title = "Admin Requests | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={5}
				name={name}
				title={"Admin Requests"}
				description={"You can accept requests from other admin. "}
				email={email}
			/>
			<h1>Hello</h1>
		</div>
	);
};
