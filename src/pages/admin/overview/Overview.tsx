import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";
import { useAuth } from "../../../../hooks/useAuth";
import { Data } from "../../../components/dashboard/overview/Data";

export const Overview: FC = () => {
	const isLoggedIn = useAuth();
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	useEffect(() => {
		document.title = "Records | WTF";
	}, []);

	if (!isLoggedIn) {
		return <Navigate to='/login' />;
	}

	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				page={1}
				name={name}
				title={"Overview"}
				description={"have a glimpse of the status of your college fee"}
				email={email}
			/>
			<div className='pl-64 pr-56'>
				<Data />
			</div>
		</div>
	);
};
