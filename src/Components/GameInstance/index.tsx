import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";
import useGame from "../../Hooks/useGame";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";
import { TGameSetup } from "../../App";

export type TValidWords = string[] | null;
export type TGameOptions = TGameSetup & { answer: string };

type TProps = {
	options: TGameOptions;
};
const StyledWordRacks = styled.div`
	padding: 0.25rem;
	font-size: 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	height: 22rem;
	flex-grow: 1;
`;

const StyledInstruction = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const GameInstance = (props: TProps) => {
	const {
		gameRows,
		charWidth,
		knownMinLength,
		knownAnswerLength,
		maxSubmitLength,
		gameState,
		handleSubmit,
		handleBackspace,
		handleLetter,
		orangeLetters,
		greenLetters,
		greyLetters,
		message,
	} = useGame(props.options);

	const { validCharacters, keyboardLayout } = props.options;

	return (
		<div id="game">
			<StyledWordRacks>
				{gameRows.map((guess, index) => (
					<Word
						key={index}
						index={index}
						isCurrent={index === gameRows.length - 1 && !gameState}
						submittedWord={guess}
						targetWord={props.options.answer}
						charWidth={charWidth}
						knownMinLength={knownMinLength}
						knownMaxLength={knownAnswerLength}
						maxSubmitLength={maxSubmitLength}
						characterLimit={props.options.characterLimit}
					/>
				))}
			</StyledWordRacks>

			<StyledInstruction>{message}</StyledInstruction>

			<CombinedKeyboard
				validCharacters={validCharacters}
				keyboardLayout={keyboardLayout}
				disabled={gameState !== ""}
				handleEnter={handleSubmit}
				handleBackspace={handleBackspace}
				handleLetter={handleLetter}
				greens={greenLetters}
				oranges={orangeLetters}
				greys={greyLetters}
			/>
		</div>
	);
};
export default GameInstance;
