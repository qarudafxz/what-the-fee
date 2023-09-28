import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import { Auth } from "./pages/Auth";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Preloader } from "./pages/Preloader";
import { Verify } from "./pages/verification/Verify";
import { EmailVerification } from "./pages/verification/EmailVerification";
import { AdminsQuestion } from "./pages/login/AdminsQuestion";
import { EnterPassword } from "./pages/login/EnterPassword";
import { EnterOtp } from "./pages/login/EnterOtp";
import { ForgotPassword } from "./pages/login/ForgotPassword";

//admin
import { Navbar } from "./components/Navbar";
import { Overview } from "./pages/admin/overview/Overview";
import { Records } from "./pages/admin/records/Records";
import { AddPayments } from "./pages/admin/payments/AddPayments";
import { AdminSettings } from "./pages/admin/admin-settings/AdminSettings";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		asyncFun().then(() => setLoading(false));
	}, []);

	if (loading) {
		return <Preloader />;
	}

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Auth />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/register'
					element={<Register />}
				/>
				<Route
					path='/verification'
					element={<Verify />}
				/>
				<Route
					path='/verify-email'
					element={<EmailVerification />}
				/>
				<Route
					path='/question'
					element={<AdminsQuestion />}
				/>
				<Route
					path='/enter-password'
					element={<EnterPassword />}
				/>
				<Route
					path='/enter-otp'
					element={<EnterOtp />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPassword />}
				/>
				{/* These are the routes that needs to have the AuthContext */}

				<Route
					path='/admin/*'
					element={
						<div className='font-main flex flex-row'>
							{/* Navbar */}
							<Navbar />
							{/* Contents */}
							<Routes>
								<Route
									path='/overview'
									element={<Overview />}
								/>
								<Route
									path='/records'
									element={<Records />}
								/>
								<Route
									path='/payment'
									element={<AddPayments />}
								/>
								<Route
									path='/settings'
									element={<AdminSettings />}
								/>
							</Routes>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

function asyncFun() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 4000);
	});
}

export default App;
