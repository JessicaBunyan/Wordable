import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import randElement from "../../utils/randElement";
import GameInstance from "../GameInstance";
import HelpModal from "../HelpModal";
import TopBar from "../TopBar";

const GamePage = (props: TGameSetup) => {
	const { answers, title } = props;
	const [answer, setAnswer] = useState(randElement(answers));
	const button = useRef<HTMLButtonElement>(null);
	const [showHelp, setShowHelp] = useState(false);

	useEffect(() => {
		document.title = props.title;
	}, [props.title]);

	const options: TGameOptions = useMemo(() => {
		return {
			...props,
			answer,
		};
	}, [answer, props]);

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
			{showHelp && <HelpModal gameOptions={options} isOpen={showHelp} onClose={() => setShowHelp(false)} />}
		</>
	);
};
export default GamePage;
