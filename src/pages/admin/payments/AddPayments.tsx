import { FC, useEffect, useState, useMemo } from "react";
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
	const [arNo, setArNo] = useState("");

	const getLastArNo = async () => {
		try {
			await fetch("http://localhost:8000/api/get-latest-payment", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					setArNo(data.last_payment.ar_no);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const cachedArNo = useMemo(() => arNo, [arNo]);

	useEffect(() => {
		if (!cachedArNo || cachedArNo.length === 0) getLastArNo();
	}, [cachedArNo]);

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
			<Payment ar_no={cachedArNo} />
		</div>
	);
};
