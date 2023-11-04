import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import AdminPrivileges from "../../../components/dashboard/admin-settings/AdminPrivileges";

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
			<div className='pl-64 pr-56 mt-5 flex flex-col w-full'>
				<AdminPrivileges />
			</div>
		</div>
	);
};
