/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import QrScanner from "qr-scanner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopLoadingBar from "react-top-loading-bar";

const QrLogin: React.FC = () => {
	const location = useLocation();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [studentId, setStudentId] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		let qrScanner: QrScanner;
		const initializeScanner = async () => {
			if (location.pathname.toString() === "/login") {
				try {
					await QrScanner.hasCamera();
					if (videoRef.current) {
						qrScanner = new QrScanner(videoRef.current, handleScanResult, {
							returnDetailedScanResult: true,
							preferredCamera: 1,
							highlightScanRegion: true,
							maxScansPerSecond: 3,
							singleChannel: false,
							calculateScanRegion: (v) => {
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
					if (qrScanner) qrScanner.destroy();
				};
			}
		};
		initializeScanner();
	}, []);

	const handleScanResult = (result: QrScanner.ScanResult) => {
		if (result) {
			setStudentId(result.data);
		}
	};

	const verifyAdmin = useCallback(
		async (studentId: string) => {
			setLoading(true);
			toast.info("Verifying...");
			setProgress(30);
			try {
				const response = await fetch("http://localhost:8080/api/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						stud_id: studentId,
					}),
				});
				const data = await response.json();
				if (!response.ok) {
					setProgress(100);
					toast.success(data.message);
					setLoading(false);
				}
			} catch (error) {
				console.error("Error while persisting info:", error);
			}
		},
		[studentId]
	);

	useEffect(() => {
		if (studentId) {
			verifyAdmin(studentId);
		}
	}, [studentId]);

	return (
		<div>
			<TopLoadingBar
				color='#59D896'
				progress={progress}
				height={3}
				onLoaderFinished={() => setProgress(0)}
			/>
			<ToastContainer />
			<div className='grid grid-cols-1 place-items-center mt-28 pb-10'>
				<div className='bg-dark rounded-md p-10 border border-zinc-800'>
					<h1 className='text-2xl font-bold text-center pb-8 text-white'>
						Please scan your Student ID to verify
					</h1>
					<video ref={videoRef} />
					<div className='p-4 mx-auto w-80'>
						<div className='bg-black flex justify-between items-center py-2 h-12 px-4 rounded-md border border-zinc-600'>
							<p className='text-lg font-thin text-primary'>{studentId}</p>
							{loading && (
								<span className='flex gap-4 items-center text-white'>
									<motion.div
										animate={{
											rotate: 360,
										}}
										transition={{ repeat: Infinity, duration: 0.4, ease: "linear" }}>
										<AiOutlineLoading3Quarters
											size={15}
											className='text-primary'
										/>
									</motion.div>
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QrLogin;