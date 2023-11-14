import React, { useState } from "react";
import { numberWithCommas } from "../../../../utils/numberWithCommas";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "@chakra-ui/react";

interface Props {
	remainingBalance: React.ReactNode;
	collegeId: string | null;
	loading: boolean;
}

const RequestExpense: React.FC<Props> = ({
	remainingBalance,
	collegeId,
	loading,
}) => {
	const [title, setTitle] = useState<string>("");
	const [dateBorrowed, setDateBorrowed] = useState<string>("");
	const [requestAmount, setRequestAmount] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const handleNewExpense = async () => {
		if (!title || !dateBorrowed || !requestAmount || !description) {
			toast.error("Please fill out all fields", {
				autoClose: 2000,
				theme: "dark",
			});
			return;
		}

		const data = {
			title,
			desc: description,
			amount: parseInt(requestAmount),
			date_borrowed: dateBorrowed,
		};

		try {
			await fetch(`http://127.0.0.1:8000/api/add-expenses/${collegeId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}).then(async (res) => {
				const data = await res.json();
				if (res.status === 200 || res.ok) {
					toast.success(data.message, {
						autoClose: 2000,
						theme: "dark",
					});
				}
			});
		} catch (err) {
			toast.error("Error adding new expense", {
				autoClose: 2000,
				theme: "dark",
			});
			throw new Error("Error adding new expense");
		}
	};

	const amount = numberWithCommas(remainingBalance as string);
	return (
		<div className='col-span-5'>
			<ToastContainer />
			<div className='font-main bg-[#0F0F0F] opacity-90 rounded-md border border-zinc-600 p-4'>
				<div className='flex justify-between items-center'>
					<h1 className='font-bold text-2xl text-white'>Add some gastusins</h1>
					{loading ? (
						<Skeleton
							variant='rectangular'
							height={40}
							width={200}
						/>
					) : (
						<p className='bg-[#414141] px-4 py-2 rounded-md font-bold text-zinc-400 border border-zinc-400'>
							Remaining balance: PHP {amount}
						</p>
					)}
				</div>
				<div className='grid grid-cols-4 gap-4 items-center w-full mt-10'>
					<div className='col-span-2'>
						<h1 className='font-bold text-xl text-primary mb-1'>Title</h1>
						<input
							type='text'
							onChange={(e) => setTitle(e.target.value)}
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-2'>
						<h1 className='font-bold text-xl text-primary mb-1'>Date Borrowed</h1>
						<input
							type='date'
							onChange={(e) => setDateBorrowed(e.target.value)}
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-4'>
						<h1 className='font-bold text-xl text-primary mb-1'>Amount</h1>
						<input
							type='text'
							onChange={(e) => setRequestAmount(e.target.value)}
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary'
						/>
					</div>
					<div className='col-span-4'>
						<h1 className='font-bold text-xl text-primary mb-1'>Description</h1>
						<textarea
							onChange={(e) => setDescription(e.target.value)}
							className='w-full bg-transparent p-3 rounded-md border border-primary text-primary h-36 resize-none'
						/>
					</div>
					<button
						onClick={handleNewExpense}
						className='col-span-4 bg-primary text-white px-4 py-2 rounded-md font-bold w-full'>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default RequestExpense;
