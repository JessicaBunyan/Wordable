import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Components/CreatePage";
import { TValidWords } from "./Components/GameInstance";
import GamePage from "./Components/GamePage";
import processSetupRecord from "./utils/processSetupRecord";
import premadeGames from "./GameFiles/premadeGames";

export type TGameSetupRecord = {
	answers: string[];
	title: string;
	icon?: string;
	maxGuesses?: number;
	validWords: TValidWords | "answers" | "english-dictionary";
	entityName: string;
	helpItems?: string[] | ReactNode[];
	suggestions?: null | "to-answers";
};

export type TGameSetup = TGameSetupRecord & {
	characterLimit: number;
	validCharacters: string[];
	validWords: TValidWords;
	keyboardLayout: { default: string[] };
};

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/create" element={<CreatePage />}></Route>
				{Object.entries(premadeGames).map(([key, gameSetup]) => (
					<Route key={key} path={`/${key}`} element={<GamePage {...processSetupRecord(gameSetup)} />} />
				))}
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
