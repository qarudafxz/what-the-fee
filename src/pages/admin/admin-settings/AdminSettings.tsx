import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";

export const AdminSettings: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	useEffect(() => {
		document.title = "Admin Settings | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={4}
				name={name}
				title={"Admin Settings"}
				description={
					"Grant permission to you co-admins for data refactoring and changes. "
				}
				email={email}
			/>
			<h1>Hello</h1>
		</div>
	);
};
