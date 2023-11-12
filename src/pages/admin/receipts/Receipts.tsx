import React, { useEffect, useState } from "react";
import { Header } from "../../../components/dashboard/Header";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import ReceiptCards from "../../../components/dashboard/receipts/ReceiptCards";
import { BiArchiveIn } from "react-icons/bi";

const Receipts: React.FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const email = getSession("email");
	const name = getSession("name");
	const admin_id = getSession("student_id");
	const token = getItem("token");

	const [receipts, setReceipts] = useState([]);
	const [loading, setLoading] = useState(false);

	const getAllReceipts = async () => {
		try {
			setLoading(true);
			await fetch("http://127.0.0.1:8000/api/receipts", {
				method: "GET",
				//eslint-disable-next-line
				//@ts-ignore
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					admin_id: admin_id,
				},
			}).then(async (res) => {
				const data = await res.json();
				console.log(data);
				setReceipts(data.receipts);
				setTimeout(() => {
					setLoading(false);
				}, 1500);
			});
		} catch (err) {
			throw new Error("Error getting all receipts.");
		}
	};

	useEffect(() => {
		getAllReceipts();
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen overflow-y-hidden'>
			<Header
				page={3}
				name={name}
				title={"Receipts"}
				description={
					"Send these backed up receipts to its corresponding student payee."
				}
				email={email}
			/>
			<div
				className='pl-64 pr-56'
				style={{
					maxHeight: "calc(100vh - 4rem)",
				}}>
				<ReceiptCards
					loading={loading}
					receipts={receipts}
					setReceipts={setReceipts}
				/>
			</div>
			<BiArchiveIn
				size={50}
				className='absolute bottom-4 right-4 text-primary'
			/>
		</div>
	);
};

export default Receipts;
