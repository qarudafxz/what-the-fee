import { FC, useState, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import PaymentsPagination from "../../../components/dashboard/get-payments/PaymentsPagination";

type Payments = {
	ar_no: string;
	created_at: Date;
	student_id: string;
	first_name: string;
	last_name: string;
	program_name: string;
	semester_name: string;
	admin_first_name: string;
	admin_last_name: string;
	desc: string;
	amount: number;
	acad_year: string;
};

export const Records: FC = () => {
	const isLoggedIn = useAuth();
	const [payments, setPayments] = useState<Payments[]>([]);
	const { getSession } = useGetSession();
	const college_id = getSession("college_id");
	const email = getSession("email");
	const name = getSession("name");

	const getPayments = async () => {
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
			} as HeadersInit);

			await fetch(`http://localhost:8000/api/get-all-payment/${college_id}`, {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					setPayments(data.payments);
					console.log(data.payments);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPayments();
	}, []);

	const cachedPayments = useMemo(() => payments, [payments]);

	useEffect(() => {
		document.title = "Payment Records | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={2}
				name={name}
				title={"Records"}
				description={
					"Check student records and address the concern of every student inquiries"
				}
				email={email}
			/>
			<div className='pl-64 pr-56 -mt-20 flex flex-col w-full overflow-y-auto custom'>
				<PaymentsPagination payments={cachedPayments} />
			</div>
		</div>
	);
};
