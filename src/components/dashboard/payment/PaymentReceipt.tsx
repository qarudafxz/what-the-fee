/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import logo from "../../../assets/logo_only.png";
import ccislsg from "../../../assets/ccislsg_logo.png";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { BiDownload } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";

interface Props {
	isBackupReceipt?: boolean;
	setIsBackupReceipt?: React.Dispatch<React.SetStateAction<boolean>>;
	receiptContent?: any;
}

const PaymentReceipt: React.FC<Props> = ({
	isBackupReceipt,
	setIsBackupReceipt,
	receiptContent,
}) => {
	const { getSession } = useGetSession();
	const { getItem } = useLocalStorage();
	const admin_id = getSession("student_id");
	const token = getItem("token");
	const receipt = useRef(null);

	const saveReceiptToDb = async () => {
		try {
			await fetch(
				`http://127.0.0.1:8000/api/save-receipt/${receiptContent?.ar_no}`,
				{
					method: "POST",
					//eslint-disable-next-line
					//@ts-ignore
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
						admin_id: admin_id,
					},
				}
			).then(async (res) => {
				if (res.status === 200 || res.ok) {
					toast.success("Successfully backed up the receipt.", {
						autoClose: 2000,
						theme: "dark",
					});
				}
			});
		} catch (err) {
			throw new Error("Error saving receipt to database.");
		}
	};

	const handleDownloadReceipt = () => {
		const receiptPdf = new JsPDF("portrait", "pt", "a4");
		const receiptElement = receipt?.current;

		try {
			html2canvas(receiptElement!)
				.then((canvas) => {
					const imgData = canvas.toDataURL("image/jpeg", 1.0);
					receiptPdf.addImage(imgData, "JPEG", 45, 0, 500, 700);
					receiptPdf.save(`${receiptContent?.ar_no}-receipt.pdf`);
				})
				.then(() => {
					saveReceiptToDb();
				})
				.then(() => {
					setIsBackupReceipt!(false);
				});
		} catch (err) {
			throw new Error("Error downloading receipt.");
		}
	};

	return (
		<>
			{isBackupReceipt && (
				<div className='fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50'>
					<ToastContainer />
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
										{new Date(receiptContent?.date).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
								<div className='flex gap-2 items-center'>
									<h1>CONTROL NO.</h1>
									<p className='text-primary font-bold text-sm'>
										{receiptContent?.ar_no}
									</p>
								</div>
							</div>
							<h1 className='text-center font-bold mt-4 text-xl'>
								ACKNOWLEDGEMENT RECEIPT
							</h1>
							<p className='text-center text-sm mt-2'>
								This is to certify that{" "}
								<span className='font-bold'>
									{receiptContent.first_name + " " + receiptContent?.last_name}
								</span>{" "}
								with ID number{" "}
								<span className='font-bold'>{receiptContent?.student_id}</span> paid the
								College fee worth{" "}
								<span className='font-bold'>₱{receiptContent?.amount.toFixed(2)}</span>
							</p>
							<div className='flex justify-between items-center mt-20 text-xs gap-10'>
								<div className='flex gap-4 items-center'>
									<p>SEMESTER</p>
									<p className='text-primary font-bold text-sm'>
										{receiptContent?.semester_id === 1 ? "1st" : "2nd"} Semester
									</p>
								</div>
								<div className='flex gap-2 items-center'>
									<p>ACADEMIC YEAR</p>
									<p className='text-primary font-bold text-sm'>
										{receiptContent?.acad_year}
									</p>
								</div>
							</div>

							<div className='flex flex-col place-content-center place-items-center justify-center mt-10'>
								<p className='font-bold'>{receiptContent?.admin_id}</p>
								<p>Collector's ID</p>
							</div>
						</div>
					</motion.form>
					<div className='flex justify-end gap-2 items-center mt-4'>
						<button
							onClick={handleDownloadReceipt}
							className='text-white bg-primary p-3 rounded-md'>
							<BiDownload
								size={25}
								className='text-black'
							/>
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default PaymentReceipt;
