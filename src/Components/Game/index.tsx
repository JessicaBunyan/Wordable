import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";
import useGame from "../../Hooks/useGame";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";

export const MAX_ANSWER_LENGTH = 10;

export type TValidWords = string[] | "english-dictionary" | null;
export type TGameOptions = { answer: string; maxGuesses?: number; validWords: TValidWords };

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

const Game = ({ answer, maxGuesses = 5, validWords = null }: TGameOptions) => {
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
	} = useGame(validWords, answer, maxGuesses);

	return (
		<div id="game">
			<StyledWordRacks>
				{gameRows.map((guess, index) => (
					<Word
						key={index}
						index={index}
						isCurrent={index === gameRows.length - 1 && !gameState}
						submittedWord={guess}
						targetWord={answer}
						charWidth={charWidth}
						knownMinLength={knownMinLength}
						knownMaxLength={knownAnswerLength}
						maxSubmitLength={maxSubmitLength}
					/>
				))}
			</StyledWordRacks>

			<StyledInstruction>{message}</StyledInstruction>

			<CombinedKeyboard
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
export default Game;
