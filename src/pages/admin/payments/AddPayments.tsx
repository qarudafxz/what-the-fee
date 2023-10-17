import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Payment } from "../../../components/dashboard/payment/Payment";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";

export const AddPayments: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	useEffect(() => {
		document.title = "Add Payments | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={3}
				name={name}
				title={"Add Payments"}
				description={
					"start the operation of handling college fees from the student. It can be manually inputted or scanned/searched via Student ID. Try now!"
				}
				email={email}
			/>
			<Payment />
		</div>
	);
};
