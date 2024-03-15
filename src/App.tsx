import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Components/CreatePage";
import GamePage from "./Components/GamePage";
import processSetupRecord from "./utils/processSetupRecord";
import premadeGames from "./GameFiles/premadeGames";
import LoadGame from "./Components/LoadGame";

export const GLOBAL_MAX_LETTERS = 15;

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/create" element={<CreatePage />}></Route>
				{premadeGames.map((gameSetup) => (
					<Route
						key={gameSetup.id}
						path={`/${gameSetup.id}`}
						element={<GamePage {...processSetupRecord(gameSetup)} />}
					/>
				))}
				<Route path="/:gameID" element={<LoadGame />} />
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
