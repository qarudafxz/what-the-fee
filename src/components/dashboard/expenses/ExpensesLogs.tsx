/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import logo from "../../../assets/logo_only.png";
import ccislogo from "../../../assets/ccislsg_logo.png";
import { Skeleton } from "@chakra-ui/react";
import jsPDF from "jspdf";

interface Expenses {
	loading: boolean;
	expenses: any[];
	data: any;
}

const ExpensesLogs: React.FC<Expenses> = ({ expenses, loading, data }) => {
	const handleGeneratePDF = () => {
		const pdf = new jsPDF();

		pdf.addImage(logo, "PNG", 20, 10, 15, 15);
		pdf.addImage(ccislogo, "PNG", 160, 4, 30, 30);

		// Add content to the PDF
		pdf.setFontSize(18);
		pdf.text("CCISLSG Liquidation Report", 20, 50);

		pdf.setFontSize(12);
		pdf.text("Generated on: " + new Date().toLocaleDateString(), 20, 60);

		pdf.setFontSize(14);
		pdf.text("Expense Details:", 20, 90);

		// Loop through expenses and add them to the PDF
		let yPos = 100;
		const lineHeight = 40;
		const pageHeight = pdf.internal.pageSize.height;

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		expenses.forEach((ex, _) => {
			const spaceLeft = pageHeight - yPos;

			if (spaceLeft < lineHeight) {
				pdf.addPage();
				yPos = 10; // Reset yPos for new page
			}

			pdf.text(`Title: ${ex.title}`, 20, yPos);
			pdf.text(
				`Date Requested: ${new Date(ex.created_at).toLocaleString()}`,
				20,
				yPos + 10
			);
			pdf.text(`Amount Borrowed: PHP ${ex.amount}`, 20, yPos + 20);
			pdf.text(
				"-------------------------------------------------------------------------",
				20,
				yPos + 30
			);

			yPos += lineHeight;
		});

		pdf.text(`Total Expenses: PHP ${data.total}`, 20, yPos + 10);

		// Save the PDF
		pdf.save(
			`CCISLSG-Liquidation-Report_${new Date().toLocaleString("en-US", {
				year: "numeric",
			})}.pdf`
		);
	};

	return (
		<div className='col-span-3'>
			<div className='flex flex-col gap-4 px-4 py-5 bg-[#0F0F0F]  opacity-90 rounded-md border border-zinc-600'>
				<h1 className='font-bold text-2xl text-zinc-500'>Expenses</h1>
				<div className='max-h-[380px] overflow-y-auto flex flex-col gap-4 custom'>
					{expenses?.map((ex, idx) => {
						return (
							<div
								key={idx}
								className='flex justify-between gap-4'>
								<div className='flex flex-col gap-1'>
									{loading ? (
										<Skeleton
											variant='text'
											height={20}
											width={80}
											startColor='rgba(255, 255, 255, 0.1)'
											endColor='rgba(255,255,255,0)'
										/>
									) : (
										<h1 className='font-bold text-sm text-zinc-600'>{ex.title}</h1>
									)}
									{loading ? (
										<Skeleton
											variant='text'
											height={20}
											width={140}
											startColor='rgba(255, 255, 255, 0.1)'
											endColor='rgba(255,255,255,0)'
										/>
									) : (
										<p className='text-xs text-zinc-600'>
											Date Requested:{" "}
											{new Date(ex?.created_at as Date).toLocaleDateString("en-US", {
												month: "long",
												day: "2-digit",
												year: "numeric",
												hour: "numeric",
												minute: "numeric",
												hour12: true,
											})}
										</p>
									)}
								</div>
								{loading ? (
									<Skeleton
										variant='rectangular'
										height={50}
										width={120}
										startColor='rgba(255, 255, 255, 0.1)'
										endColor='rgba(255,255,255,0)'
									/>
								) : (
									<p className='font-bold text-xs bg-zinc-800 text-zinc-600 px-4 py-1 rounded-md border border-zinc-600 flex justify-center place-items-center'>
										PHP {ex?.amount}
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<button
				onClick={handleGeneratePDF}
				className='font-bold bg-[#0F0F0F] text-center py-4 rounded-md border border-zinc-700 text-zinc-700 w-full mt-4'>
				Generate LR
			</button>
		</div>
	);
};

export default ExpensesLogs;
