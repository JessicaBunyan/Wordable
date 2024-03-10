import { useCallback, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Game from "./Components/Game";
import HelpModal from "./Components/HelpModal";
import TopBar from "./Components/TopBar";
import pokemon from "./GameFiles/pokemon";
import randElement from "./utils/randElement";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePage from "./Components/CreatePage";

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	const [target, setTarget] = useState(randElement(pokemon));
	// const [target, setTarget] = useState("");
	const [showHelp, setShowHelp] = useState(false);
	const validWords = pokemon;
	const button = useRef<HTMLButtonElement>(null);

	const onReset = useCallback(() => {
		setTarget(randElement(pokemon));
		button.current?.blur();
	}, [button, setTarget]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/create" element={<CreatePage />}></Route>
				<Route
					path="*"
					element={
						<div className="app">
							<TopBar onReset={onReset} setShowHelp={setShowHelp} />
							<div className="game-container">
								{target && <Game key={target} answer={target} validWords={validWords} />}
							</div>
							;{showHelp && <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />}
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
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
