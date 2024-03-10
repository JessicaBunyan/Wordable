import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Components/CreatePage";
import GamePage from "./Components/GamePage";
import pokemon from "./GameFiles/pokemon";
import { TValidWords } from "./Components/GameInstance";
import colors from "./GameFiles/colors";
import { ReactNode } from "react";

export type TGameSetup = {
	answers: string[];
	title: string;
	icon?: string;
	maxGuesses?: number;
	validWords: TValidWords;
	entityName: string;
	helpItems?: string[] | ReactNode[];
	suggestions?: null | "to-answers";
};

const games: { [key: string]: TGameSetup } = {
	pokemon: {
		answers: pokemon,
		title: "Pokémonable",
		validWords: pokemon,
		entityName: "pokémon (1st gen)",
		helpItems: ["Only valid pokemon are accepted", "All punctuation/symbols are removed (mrmime, farfetchd, nidoran)"],
		suggestions: "to-answers",
	},
	"*": {
		answers: pokemon,
		title: "Pokémonable",
		validWords: pokemon,
		entityName: "pokémon (1st gen)",
		helpItems: ["Only valid pokemon are accepted", "All punctuation/symbols are removed (mrmime, farfetchd, nidoran)"],
		suggestions: "to-answers",
	},
	colours: {
		answers: colors,
		title: "Colourable",
		validWords: "english-dictionary",
		entityName: "colour",
	},
};

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/create" element={<CreatePage />}></Route>
				{Object.entries(games).map(([key, gameSetup]) => (
					<Route key={key} path={`/${key}`} element={<GamePage {...gameSetup} />} />
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
