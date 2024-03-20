import "react-simple-keyboard/build/css/index.css";
import styles from "./GameInstance.module.css";
import useGame from "../../Hooks/useGame";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";

type TProps = {
	options: TGameOptions;
};

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
			<div className={styles.wordRack}>
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
			</div>

			<h2 className={styles.message}>{message}</h2>

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
