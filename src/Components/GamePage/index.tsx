import { useCallback, useEffect, useRef, useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import { TGameSetup } from "../../App";
import randElement from "../../utils/randElement";
import GameInstance, { TGameOptions } from "../GameInstance";
import HelpModal from "../HelpModal";
import TopBar from "../TopBar";

const GamePage = (props: TGameSetup) => {
	const { answers, title, helpItems = [] } = props;
	const [answer, setAnswer] = useState(randElement(answers));
	const button = useRef<HTMLButtonElement>(null);
	const [showHelp, setShowHelp] = useState(false);

	const options: TGameOptions = {
		...props,
		answer,
	};

	const onReset = useCallback(() => {
		setAnswer(randElement(answers));
		button.current?.blur();
	}, [button, setAnswer, answers]);

	useEffect(() => {
		document.title = title;
	}, [title]);
	return (
		<>
			<TopBar title={title} onReset={onReset} setShowHelp={setShowHelp} />
			<div className="game-container">{answer && <GameInstance key={answer} options={options} />}</div>
			{showHelp && <HelpModal helpItems={helpItems} isOpen={showHelp} onClose={() => setShowHelp(false)} />}
		</>
	);
};
export default GamePage;
