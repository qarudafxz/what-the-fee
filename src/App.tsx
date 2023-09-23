import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import { Auth } from "./pages/Auth";
import { Login } from "./pages/Login";

function App() {
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
			</Routes>
		</Router>
	);
}

export default App;
