import { FC, useEffect } from "react";
import { Header } from "../../../components/dashboard/Header";
import { useGetSession } from "../../../../hooks/useGetSession";

export const Overview: FC = () => {
	const { getSession } = useGetSession();
	const email = getSession("email");
	const name = getSession("name");

	useEffect(() => {
		document.title = "Overview | WTF";
	}, []);
	return (
		<div className='w-full bg-dark h-screen'>
			<Header
				name={name}
				title={"Overview"}
				description={"have a glimpse of the status of your college fee"}
				email={email}
			/>
			<h1>Hello</h1>
		</div>
	);
};
