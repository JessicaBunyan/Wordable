import { Toaster } from "react-hot-toast";
import TopBar from "./Components/TopBar";
import { useCallback, useRef, useState } from "react";
import randElement from "./utils/randElement";
import pokemon from "./GameFiles/pokemon";
import Game from "./Components/Game";

function App() {
	const toastPosition = window.innerWidth <= 600 ? "top-center" : "bottom-right";

	const [target, setTarget] = useState(randElement(pokemon));
	const [showHelp, setShowHelp] = useState(false);
	const validWords = pokemon;
	const button = useRef<HTMLButtonElement>(null);

	const onReset = useCallback(() => {
		setTarget(randElement(pokemon));
		button.current?.blur();
	}, [button, setTarget]);

	return (
		<div className="app">
			<TopBar onReset={onReset} setShowHelp={setShowHelp} />
			<div className="game-container">{target && <Game key={target} word={target} validWords={validWords} />}</div>;
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
				}}
			/>
		</div>
	);
}
export default App;
