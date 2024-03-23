import "react-simple-keyboard/build/css/index.css";
import styles from "./GameInstance.module.css";
import useGame from "../../Hooks/useGame";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";
import getFlipDuration from "../../utils/getFlipDuration";

type TProps = {
	options: TGameOptions;
};

const GameInstance = (props: TProps) => {
	// props.options.answer = "rattata";
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
		misplacedLetters,
		correctLetters,
		incorrectlyGuessedLetters,
		currentWordLetters,
		message,
	} = useGame(props.options);

	const { validCharacters, keyboardLayout } = props.options;

	const flipDuration = getFlipDuration();
	const keyboardTransitionDelay =
		gameRows.length >= 2 ? `${gameRows[gameRows.length - 2].length * flipDuration}ms` : "0ms";

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
						style={{ animationDelay: index ? `${gameRows[index - 1].length * flipDuration}ms` : "0ms" }}
					/>
				))}
			</div>

			<h2 className={styles.message}>{message}</h2>
			{/* // TODO this isnt working due to react keyboard creating whole new letters  */}
			<div style={{ transitionDelay: keyboardTransitionDelay }}>
				<CombinedKeyboard
					validCharacters={validCharacters}
					keyboardLayout={keyboardLayout}
					disabled={gameState !== ""}
					handleEnter={handleSubmit}
					handleBackspace={handleBackspace}
					handleLetter={handleLetter}
					correctLetters={correctLetters}
					misplacedLetters={misplacedLetters}
					incorrectLetters={incorrectlyGuessedLetters}
					currentGuessLetters={currentWordLetters}
				/>
			</div>
		</div>
	);
};
export default GameInstance;
