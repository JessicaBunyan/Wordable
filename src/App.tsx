import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Components/CreatePage";
import LoadGame from "./Components/LoadGame";
import { premadeGames } from "./GameFiles/premadeGames";
import HomePage from "./Components/HomePage";
import StaticGameLoader from "./Components/StaticGameLoader";

export const GLOBAL_MAX_LETTERS = 15;

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/create" element={<CreatePage />}></Route>
				{premadeGames.map(({ id }) => (
					<Route key={id} path={`/${id}`} element={<StaticGameLoader id={id} />} />
				))}
				<Route path="/:gameID" element={<LoadGame />} />
				<Route path="/" element={<HomePage />}></Route>
			</Routes>
			<Toaster
				toastOptions={{
					duration: 3000,
					position: toastPosition,
					className: "toast",
					error: {
						style: {
							background: "var(--red)",
							color: "white",
						},
					},
					style: {
						background: "var(--blue)",
						fontWeight: "bold",
						color: "black",
					},
				}}
			/>
		</BrowserRouter>
	);
}
export default App;
