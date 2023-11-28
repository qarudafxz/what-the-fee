import { FC, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useLocalStorage } from "../../../../hooks/useLocaleStorage";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import Requests from "../../../components/dashboard/admin-requests/Requests";
import ViewRequest from "../../../components/dashboard/admin-requests/ViewRequest";

export const AdminRequests: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");
	const { getItem } = useLocalStorage();
	const token = getItem("token");
	const admin_id = getSession("student_id");
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedRequestId, setSelectedRequestId] = useState(0);
	const [isView, setIsView] = useState(false);
	const [viewedRequest, setViewedRequest] = useState({});

	const getRequests = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		setLoading(true);
		try {
			await fetch("http://localhost:8000/api/requests", {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();

				if (res.ok || res.status === 200) {
					setRequests(data?.requests);
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				}
			});
		} catch (err) {
			throw new Error("Error getting logs");
		}
	};

	const getViewRequest = async () => {
		const headers = new Headers({
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			admin_id: admin_id,
		} as HeadersInit);

		setLoading(true);
		try {
			await fetch(`http://localhost:8000/api/request/${selectedRequestId}`, {
				method: "GET",
				headers,
			}).then(async (res) => {
				const data = await res.json();

				if (res.ok || res.status === 200) {
					setViewedRequest(data?.request);
					setTimeout(() => {
						setLoading(false);
					}, 1000);
				}
			});
		} catch (err) {
			throw new Error("Error getting logs");
		}
	};

	useEffect(() => {
		if (isView) {
			//fetch the data of selectedRequestId
			getViewRequest();
		}
	}, [isView, selectedRequestId]);

	useEffect(() => {
		document.title = "Admin Requests | WTF";
		getRequests();
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={5}
				name={name}
				title={"Admin Requests"}
				description={"You can accept requests from other admin. "}
				email={email}
			/>
			<div className='pl-64 pr-56 mt-5 grid grid-cols-3 w-full gap-4 relative bottom-20'>
				<Requests
					requests={requests}
					loading={loading}
					setSelectedRequestId={setSelectedRequestId}
					setIsView={setIsView}
				/>
				{/* eslint-disable-next-line */}
				{/* @ts-ignore */}
				<ViewRequest
					getRequests={getRequests}
					//eslint-disable-next-line
					//@ts-ignore
					viewedRequest={viewedRequest}
				/>
			</div>
		</div>
	);
};
