import React from "react";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const Expenses: React.FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen overflow-y-hidden'>
			<Header
				page={3}
				name={name}
				title={"Expenses"}
				description={
					"If there are any expenses that the college would spend, add record for traction of expenses as well as generation of Liquidation reports"
				}
				email={email}
			/>
		</div>
	);
};

export default Expenses;
