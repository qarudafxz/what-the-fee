/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
//eslint-disable-next-line
//@ts-nocheck
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo_only.png";
import ccislsg from "../../../assets/ccislsg_logo.png";
import { Header } from "../../../components/dashboard/Header";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import ReceiptCards from "../../../components/dashboard/receipts/ReceiptCards";
import { BiArchiveIn } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";
import TopLoadingBar from "react-top-loading-bar";
import { Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";

const Receipt: React.FC<{
	isView: boolean;
	receipt: any;
	setIsView: any;
	setSelectedReceipt: any;
}> = ({ isView, receipt, setIsView, setSelectedReceipt }) => {
	return (
		<>
			{isView === true && (
				<div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50'>
					<ToastContainer />
					<IoCloseCircleOutline
						onClick={() => {
							setIsView(false);
							setSelectedReceipt({});
						}}
						size={40}
						className='text-white mb-10 cursor-pointer'
					/>
					<motion.form
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.5 }}
						transition={{
							duration: 0.8,
							type: "spring",
							ease: [0, 0.71, 0.2, 0],
						}}
						className='bg-white p-8 rounded-md w-[400px]'
						ref={receipt}>
						<div className='flex justify-between items-center'>
							<img
								src={logo}
								alt='WTF Logo'
								className='w-8 h-8'
							/>
							<div className='flex items-center gap-2'>
								<img
									src={ccislsg}
									alt='CCISLSG Logo'
									className='w-8 h-8'
								/>
								<p className='text-primary font-bold text-sm'>CCISLSG</p>
							</div>
						</div>
						<div className='flex flex-col gap-2 mt-14'>
							<div className='flex justify-between items-center'>
								<div className='flex gap-2 items-center'>
									<h1>DATE</h1>
									<p className='text-primary font-bold text-sm'>
										{new Date(receipt?.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
								<div className='flex gap-2 items-center'>
									<h1>CONTROL NO.</h1>
									<p className='text-primary font-bold text-sm'>{receipt?.ar_no}</p>
								</div>
							</div>
							<h1 className='text-center font-bold mt-4 text-xl'>
								ACKNOWLEDGEMENT RECEIPT
							</h1>
							<p className='text-center text-sm mt-2'>
								This is to certify that{" "}
								<span className='font-bold'>
									{receipt.first_name + " " + receipt?.last_name}
								</span>{" "}
								with ID number <span className='font-bold'>{receipt?.student_id}</span>{" "}
								paid the College fee worth{" "}
								<span className='font-bold'>₱{receipt.amount}</span>
							</p>
							<div className='flex justify-between items-center mt-20 text-xs gap-10'>
								<div className='flex gap-4 items-center'>
									<p>SEMESTER</p>
									<p className='text-primary font-bold text-sm'>
										{receipt?.semester_id === 1 ? "1st" : "2nd"} Semester
									</p>
								</div>
								<div className='flex gap-2 items-center'>
									<p>ACADEMIC YEAR</p>
									<p className='text-primary font-bold text-sm'>{receipt?.acad_year}</p>
								</div>
							</div>

							<div className='flex flex-col place-content-center place-items-center justify-center mt-10'>
								<p className='font-bold'>{receipt?.admin_id}</p>
								<p>Collector's ID</p>
							</div>
						</div>
					</motion.form>
				</div>
			)}
		</>
	);
};

const Receipts: React.FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const email = getSession("email");
	const name = getSession("name");
	const admin_id = getSession("student_id");
	const token = getItem("token");
	const [receipts, setReceipts] = useState([]);
	const [selectedReceipt, setSelectedReceipt] = useState({});
	const [isView, setIsView] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [progress, setProgress] = useState<number | null>(null);
	const [archivedReceipts, setArchivedReceipts] = useState([] as any[]);

	const getArchiveReceipts = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		try {
			await fetch("http://localhost:8000/api/archives", {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();
				console.log(data.archives);
				setArchivedReceipts(data.archives);
			});
		} catch (err) {
			throw new Error("Error getting archived receipts.");
		}
	};

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

				setReceipts(data.receipts);
				setTimeout(() => {
					setLoading(false);
					setProgress(100);
				}, 1500);
			});
		} catch (err) {
			throw new Error("Error getting all receipts.");
		}
	};

	const archiveReceipt = async () => {
		if (!receipts[index]?.ar_no || receipts[index]?.ar_no === "") return;

		setProgress(30);
		try {
			const headers = new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				admin_id: admin_id,
			} as HeadersInit);

			await fetch(
				`http://localhost:8000/api/archive-receipt/${
					receipts[index]?.ar_no as string
				}`,
				{
					method: "POST",
					headers,
				}
			).then(async (res) => {
				setProgress(60);

				if (res.status === 200 || res.ok) {
					toast.success("Receipt archived.", {
						autoClose: 2000,
						theme: "dark",
					});
					setProgress(100);
					getAllReceipts();
					setIndex(null);
				}
			});
		} catch (err) {
			throw new Error("Error archiving receipt.");
		}
	};

	const sendReceipt = async (ar_no: string, type?: string) => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		//get first the receipt that will be sent to the student
		if (!ar_no || ar_no === "") return;

		try {
			const receipt_data = await fetch(
				`http://localhost:8000/api/receipt/${ar_no}`,
				{
					method: "GET",
					headers,
				}
			);
			if (receipt_data.status !== 200 || !receipt_data.ok) {
				toast.error("Error sending receipt.", {
					autoClose: 2000,
					theme: "dark",
				});
				return;
			}
			const receipt = await receipt_data.json();

			setSelectedReceipt(receipt.receipt[0]);

			if (type === "send") {
				//Firebase real time database to send the receipt to the student
			}

			if (type === "view") setIsView(true);
		} catch (err) {
			throw new Error("Error sending receipt.");
		}
		// const receipt = await app.database().ref("receipts").child("receipt_id");
	};

	const restoreReceipt = async (ar_no: string) => {
		if (!ar_no || ar_no === "") return;

		try {
			const headers = new Headers({
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				admin_id: admin_id,
			} as HeadersInit);

			await fetch(`http://localhost:8000/api/restore-receipt/${ar_no}`, {
				method: "POST",
				headers,
			}).then(async (res) => {
				if (res.status === 200 || res.ok) {
					toast.success("Receipt restored.", {
						autoClose: 2000,
						theme: "dark",
					});
					getAllReceipts();
					setProgress(100);
					setIndex(null);
				}
			});
		} catch (err) {
			throw new Error("Error restoring receipt.");
		}
	};

	useEffect(() => {
		getAllReceipts();
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen overflow-hidden'>
			<ToastContainer />
			<TopLoadingBar
				progress={progress as unknown as number}
				color='#49B0AD'
				height={3}
				onLoaderFinished={() => setProgress(null)}
			/>
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
					sendReceipt={sendReceipt}
					setIndex={setIndex}
				/>
			</div>
			<div className='fixed bottom-8 right-4'>
				<Popover
					placement='bottom-end'
					closeOnBlur={true}>
					<PopoverTrigger>
						<BiArchiveIn
							onClick={getArchiveReceipts}
							onMouseEnter={archiveReceipt}
							size={50}
							className=' text-primary cursor-pointer'
						/>
					</PopoverTrigger>
					<PopoverContent className='bg-[#0F0F0F] p-4 rounded-md border border-zinc-800 text-white text-center relative bottom-[450px] right-[330px]'>
						<p className='font-bold'>Archive Receipt</p>
						<p className='text-xs mb-4'>
							You can restore the receipt from the archived section.
						</p>
						<div className='flex flex-col gap-2 max-h-[340px] overflow-y-auto custom'>
							{archivedReceipts.length > 0 &&
								archivedReceipts?.map((receipt, idx) => {
									return (
										<div
											key={idx}
											className='flex justify-between'>
											<h1 className='font-bold text-xl'>{receipt?.ar_no}</h1>
											<button
												onClick={() => restoreReceipt(receipt?.ar_no)}
												className='text-xs flex gap-2 items-center bg-zinc-600 border border-zinc-400 text-400 px-2 py-1 rounded-md'>
												Restore
											</button>
										</div>
									);
								})}
						</div>
					</PopoverContent>
				</Popover>
			</div>
			<Receipt
				isView={isView}
				receipt={selectedReceipt}
				setIsView={setIsView}
				setSelectedReceipt={setSelectedReceipt}
			/>
		</div>
	);
};

export default Receipts;
