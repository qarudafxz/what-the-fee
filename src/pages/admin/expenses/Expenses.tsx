import React, { useState, useEffect } from "react";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import RequestExpense from "../../../components/dashboard/expenses/RequestExpense";
import ExpensesLogs from "../../../components/dashboard/expenses/ExpensesLogs";

const Expenses: React.FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");
	const college_id = getSession("college_id");
	const [remainingBalance, setRemainingBalance] = useState<number>(0);

	const fetchTotalPayment = async () => {
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
			} as HeadersInit);

			await fetch(`http://localhost:8000/api/get-total-payment/${college_id}`, {
				method: "GET",
				headers,
			})
				.then(async (res) => {
					const data = await res.json();
					if (res.status === 200 || res.ok) {
						setRemainingBalance(data.total_payment);
					}
				})
				.catch((error) => {
					console.error("Error fetching total payment:", error);
				});
		} catch (err) {
			console.error("Error fetching total payment:", err);
		}
	};

	useEffect(() => {
		fetchTotalPayment();
	}, []);

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
			<div className='pl-64 pr-56 grid grid-cols-7 w-full mt-6 space-x-10 relative lg:bottom-24 xl:bottom-18'>
				<RequestExpense remainingBalance={remainingBalance} />
				<ExpensesLogs />
			</div>
		</div>
	);
};

export default Expenses;
