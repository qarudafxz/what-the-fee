/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import QrScanner from "qr-scanner";

const QrLogin: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [studentId, setStudentId] = useState<string | null>(null);

	useEffect(() => {
		let qrScanner: QrScanner;

		const initializeScanner = async () => {
			try {
				await QrScanner.hasCamera();
				if (videoRef.current) {
					qrScanner = new QrScanner(videoRef.current, handleScanResult, {
						returnDetailedScanResult: true,
						preferredCamera: 1,
						highlightScanRegion: true,
						maxScansPerSecond: 3,
						singleChannel: false,
						calculateScanRegion: (v: HTMLVideoElement) => {
							const heightRegionSize = Math.round(
								0.7 * Math.min(v.videoWidth, v.videoHeight)
							);
							const widthRegionSize = Math.round(0.4 * v.videoWidth);
							const region: QrScanner.ScanRegion = {
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
		};

		initializeScanner();
	}, []);

	const handleScanResult = (result: QrScanner.ScanResult) => {
		if (result) {
			setStudentId(result.data);
		}
	};

	const login = useCallback(
		async (studentId: string) => {
			try {
				const response = await fetch("http://localhost:8080/api/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						stud_id: studentId,
					}),
				});
				const data = await response.json();
				alert(data.message);
			} catch (error) {
				console.error("Error while persisting info:", error);
			}
		},
		[studentId]
	);

	useEffect(() => {
		if (studentId) login(studentId);
	}, [studentId]);

	return (
		<div>
			<div className='grid grid-cols-1 place-items-center mt-28'>
				<video ref={videoRef}></video>
				<h1 className='font-bold text-2xl'>
					Student Id: {studentId ? studentId : "Scanning..."}
				</h1>
			</div>
		</div>
	);
};

export default QrLogin;
