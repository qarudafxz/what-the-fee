/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

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
	const receipt = useRef(null);

	return (
		<>
			{isBackupReceipt && (
				<div className=''>
					<h1>Hello</h1>
				</div>
			)}
		</>
	);
};

export default PaymentReceipt;
