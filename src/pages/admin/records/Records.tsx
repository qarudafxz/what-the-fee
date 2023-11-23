import {
	FC,
	useState,
	useEffect,
	useMemo,
	Dispatch,
	SetStateAction,
} from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useAuth } from "../../../../hooks/useAuth";
import PaymentsPagination from "../../../components/dashboard/get-payments/PaymentsPagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
	date: Date;
};

export const Records: FC = () => {
	const isLoggedIn = useAuth();
	const [payments, setPayments] = useState<Payments[]>([]);
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const email = getSession("email");
	const name = getSession("name");

	const getPayments = async () => {
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				admin_id: admin_id,
			} as HeadersInit);

			await fetch(`http://localhost:8000/api/get-all-payment/`, {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					setPayments(data.payments);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const filterPayments = (
		filter_type: string,
		value: string,
		setValue: Dispatch<SetStateAction<string>>
	) => {
		if (value === "") {
			toast.error("Please provide a value first", {
				autoClose: 2000,
				theme: "dark",
			});
			return;
		}

		console.log(filter_type, value);
		if (filter_type === "") return getPayments();

		if (filter_type === "student_id") {
			const regex = /^[0-9]{3}-[0-9]{5}$/;
			if (!regex.test(value)) {
				toast.error("Invalid Student ID", {
					autoClose: 2000,
					theme: "dark",
				});
				return;
			}

			return setPayments(
				payments.filter((payment) => payment.student_id === value)
			);
		}

		if (filter_type === "ar_no") {
			const regex = /^AR/;
			if (!regex.test(value)) {
				toast.error(`Invalid AR No. It must start with the prefix "AR"`, {
					autoClose: 2000,
					theme: "dark",
				});
				return;
			}

			return setPayments(payments.filter((payment) => payment.ar_no === value));
		}

		setValue("");
	};

	const cachedPayments = useMemo(() => payments, [payments]);

	useEffect(() => {
		if (!cachedPayments || cachedPayments.length === 0) getPayments();
	}, [cachedPayments]);

	useEffect(() => {
		document.title = "Payment Records | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<ToastContainer />
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
				<PaymentsPagination
					payments={cachedPayments}
					filterPayments={filterPayments}
				/>
			</div>
		</div>
	);
};
