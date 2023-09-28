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
