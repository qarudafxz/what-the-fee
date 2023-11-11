import { FC, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import AdminPrivileges from "../../../components/dashboard/admin-settings/AdminPrivileges";
import Logs from "../../../components/dashboard/admin-settings/Logs";

export const AdminSettings: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");
	const [permissions, setPermissions] = useState([]);

	const getPermissions = async () => {
		try {
			await fetch("http://127.0.0.1:8000/api/permissions", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${getSession("token")}`,
				},
			}).then(async (res) => {
				const data = await res.json();
				setPermissions(data.permissions);
			});
		} catch (err) {
			throw new Error("Error fetching all the permisisons.");
		}
	};

	useEffect(() => {
		document.title = "Admin Settings | WTF";
		getPermissions();
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
			<div className='pl-64 pr-56 mt-5 grid grid-cols-3 w-full gap-4'>
				<AdminPrivileges permissions={permissions} />
				<div className='flex flex-col gap-2'>
					<Logs />
				</div>
			</div>
		</div>
	);
};
