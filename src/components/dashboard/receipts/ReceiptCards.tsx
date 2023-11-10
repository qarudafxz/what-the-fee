/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, DragEvent } from "react";
import { FaFilePdf } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";

interface Receipt {
	id: string;
	ar_no: string;
}

interface Props {
	loading?: boolean;
	receipts: Receipt[];
	setReceipts: React.Dispatch<React.SetStateAction<Receipt[]>> | any;
}

const ReceiptCard: React.FC<{
	receipt: Receipt;
	index: number;
	onDragStart: (e: DragEvent<HTMLDivElement>, index: number) => void;
	onDragOver: (e: DragEvent<HTMLDivElement>, index: number) => void;
	onDrop: (e: DragEvent<HTMLDivElement>, index: number) => void;
	draggedIndex: number | null;
}> = ({ receipt, index, onDragStart, onDragOver, onDrop, draggedIndex }) => {
	const dragRef = useRef<HTMLDivElement>(null);

	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		onDragStart(e, index);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		onDragOver(e, index);
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		onDrop(e, index);
	};

	return (
		<div
			ref={dragRef}
			draggable
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			className={`bg-zinc-900 border border-zinc-700 p-4 rounded-lg flex flex-col gap-2 items-center place-items-center justify-center ${
				draggedIndex === index ? "cursor-grabbing" : "cursor-grab"
			}`}>
			<FaFilePdf
				size={60}
				className='text-primary'
			/>
			<p className='text-zinc-400 font-bold text-xl'>{receipt.ar_no}</p>
			<button className='px-3 py-2 font-bold text-zinc-400 shadow-[#050505] shadow-md'>
				Send
			</button>
		</div>
	);
};

const ReceiptCards: React.FC<Props> = ({ loading, receipts, setReceipts }) => {
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

	const handleDragStart = (_e: DragEvent<HTMLDivElement>, index: number) => {
		setDraggedIndex(index);
		console.log(index);
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (_e: DragEvent<HTMLDivElement>, index: number) => {
		if (draggedIndex !== null) {
			const draggedItem = receipts[draggedIndex];
			const updatedReceipts = [...receipts];
			updatedReceipts.splice(draggedIndex, 1);
			updatedReceipts.splice(index, 0, draggedItem);
			setReceipts(updatedReceipts);
			setDraggedIndex(null);
		}
	};

	return (
		<div className='grid grid-cols-7 gap-4 mt-4'>
			{receipts.map((receipt, index) =>
				loading ? (
					<Skeleton
						key={receipt.id}
						variant='rectangular'
						width={120}
						height={140}
						className='bg-zinc-900 border border-zinc-800 p-4 rounded-lg flex flex-col gap-2 items-center place-items-center justify-center'
					/>
				) : (
					<ReceiptCard
						key={receipt.id}
						receipt={receipt}
						index={index}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						draggedIndex={draggedIndex}
						//eslint-disable-next-line
						//@ts-ignore
					/>
				)
			)}
		</div>
	);
};

export default ReceiptCards;
