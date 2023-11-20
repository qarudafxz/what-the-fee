import React, {
	useEffect,
	useRef,
	useCallback,
	Dispatch,
	SetStateAction,
} from "react";
import QrScanner from "qr-scanner";

interface PaymentQrScannerProps {
	isQrScanner: boolean;
	handleStudentSearch: () => void;
	setStudentID?: Dispatch<SetStateAction<string>>;
	setIsQrScanner?: Dispatch<SetStateAction<boolean>>;
	studentID?: string;
}

const PaymentQrScanner: React.FC<PaymentQrScannerProps> = ({
	isQrScanner,
	handleStudentSearch,
	setStudentID,
	setIsQrScanner,
	studentID,
}) => {
	let qrScanner: QrScanner;
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (isQrScanner) {
			const initializeScanner = async () => {
				try {
					await QrScanner.hasCamera();
					if (videoRef.current) {
						// eslint-disable-next-line react-hooks/exhaustive-deps
						qrScanner = new QrScanner(videoRef.current, handleScanResult, {
							preferredCamera: "environment",
							returnDetailedScanResult: true,
							highlightScanRegion: true,
							maxScansPerSecond: 3,
							calculateScanRegion: (v: HTMLVideoElement) => {
								const heightRegionSize = Math.round(
									0.7 * Math.min(v.videoWidth, v.videoHeight)
								);
								const widthRegionSize = Math.round(0.4 * v.videoWidth);
								const region = {
									x: Math.round((v.videoWidth - widthRegionSize) / 2),
									y: Math.round((v.videoHeight - heightRegionSize) / 2),
									width: widthRegionSize,
									height: heightRegionSize,
								};

								return region;
							},
						});
						qrScanner.start();
					}
				} catch (error) {
					console.error("Error initializing scanner:", error);
				}

				return () => {
					if (qrScanner) {
						qrScanner.stop();
						qrScanner.destroy();
					}
				};
			};

			initializeScanner();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isQrScanner]);

	const handleStudentSearchingViaCallBack = useCallback(() => {
		async (studentId: string) => {
			const regex = /^[0-9]{3}-[0-9]{5}$/;
			if (!regex.test(studentId)) {
				setStudentID!("");
				return;
			}
			handleStudentSearch();
			console.log(studentId);
			setIsQrScanner!(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studentID]);

	const handleScanResult = (result: QrScanner.ScanResult | string) => {
		if (!(typeof result === "string")) {
			if (setStudentID) {
				setStudentID(result.data);
				handleStudentSearchingViaCallBack();
			}
		}
	};

	return (
		<>
			{isQrScanner && (
				<div
					className={`fixed inset-0 z-90 flex items-center justify-center bg-black backdrop-blur-lg`}>
					<div className='bg-dark w-full h-full flex flex-col items-center justify-center'>
						<div className='bg-dark w-[800px] h-[600px] rounded-md border border-primary px-10'>
							<video
								className='w-full h-[600px] '
								ref={videoRef}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PaymentQrScanner;
