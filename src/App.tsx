import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import { Auth } from "./pages/Auth";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Auth />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
