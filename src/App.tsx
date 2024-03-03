import { Toaster } from "react-hot-toast";
import TopBar from "./Components/TopBar";
import { useCallback, useRef, useState } from "react";
import randElement from "./utils/randElement";
import pokemon from "./GameFiles/pokemon";
import Game from "./Components/Game";
import ReactModal from "react-modal";

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
			{showHelp && (
				<ReactModal isOpen={showHelp}>
					<h1 style={{ fontSize: "1.5rem" }}>Help v0</h1>
					<ul>
						<li>. </li>
						<li>This is in beta</li>
						<li>. </li>
						<li>Only valid pokemon are accepted</li>
						<li> .</li>
						<li>Answers can be any length from 3-15 chars</li>
						<li> .</li>
						<li>If the diamond goes green your guess was the correct length</li>
						<li> .</li>
						<li>Bad luck if you get Mr.Mime or Farfetchd as they are broken due to punctuation</li>
					</ul>
					<button onClick={() => setShowHelp(false)}>Close</button>
				</ReactModal>
			)}
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
