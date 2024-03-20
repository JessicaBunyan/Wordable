import React, { ReactNode } from "react";
import styles from "./Word.module.css";
import Letter from "../Letter";
import EndMarker from "../EndMarker";

type Props = {
	index: number;
	submittedWord: string;
	targetWord: string;
	charWidth: number;
	isCurrent: boolean;
	knownMaxLength?: number;
	knownMinLength: number;
	maxSubmitLength: number;
	characterLimit: number;
};

const Word = ({
	isCurrent,
	targetWord,
	submittedWord,
	knownMaxLength,
	knownMinLength,
	charWidth,
	maxSubmitLength,
	characterLimit,
}: Props) => {
	const fadeStart = Math.max(knownMinLength, submittedWord.length, knownMaxLength || 0);
	const fraction = 90 / charWidth; // TODO a bit dependent on the screen width

	const letters = isCurrent
		? getCurrentWordLetters(submittedWord, charWidth, maxSubmitLength)
		: getSubmittedWordLetters(targetWord, submittedWord, charWidth, characterLimit);

	const customStyles = {
		left: fraction * fadeStart + "%",
		width: `calc(${100 - fraction * fadeStart}% - 2rem)`,
	};
	return (
		<div className={styles.word}>
			{letters}
			<EndMarker
				guessedWord={submittedWord}
				submitted={!isCurrent}
				targetWord={targetWord}
				knownMaxLength={knownMaxLength}
			/>
			<span className={styles.shield} style={customStyles} />
		</div>
	);
	// if (props.isCurrent)
	// letters {
	// 	return <CurrentWord {...props} current={props.submittedWord} knownMinLength={0} />;
	// } else {
	// return <SubmittedWord {...props} />;
	// }
};

function getCurrentWordLetters(guessedWord: string, charWidth: number, maxAnswerLength: number) {
	const letters: ReactNode[] = [];

	for (let i = 0; i < charWidth; i++) {
		const guess = guessedWord[i];
		const state: TLetterState = i >= maxAnswerLength ? "invisible" : "default";
		// let border = "none"; //"solid 1px var(--border)";
		letters.push(<Letter index={i} key={i} state={state} letter={guess} />);
	}
	return letters;
}

function getSubmittedWordLetters(targetWord: string, current: string, maxAnswerLength: number, characterLimit: number) {
	const letters: ReactNode[] = [];

	const potentialOranges: string[] = getPotentialOranges(targetWord, current);

	for (let i = 0; i < characterLimit; i++) {
		const guessed = current[i];
		const actual = targetWord[i];
		let state: TLetterState = "default";
		if (!guessed) {
			letters.push(<Letter index={i} key={i} state={i >= maxAnswerLength ? "nonExistent" : "invisible"} letter={""} />);
			continue;
		}
		if (guessed === actual) {
			state = "correct";
		} else if (targetWord.indexOf(guessed) > -1 && potentialOranges.find((l) => l === guessed)) {
			state = "misplaced";
			potentialOranges.splice(
				potentialOranges.findIndex((l) => l === guessed),
				1,
			);
		}
		letters.push(<Letter index={i} key={i} state={state} letter={current[i]} />);
	}
	return letters;
}

function getPotentialOranges(targetWord: string, guess: string) {
	const potentialOranges: string[] = [];

	for (let i = 0; i < targetWord.length; i++) {
		const guessed = guess[i];
		const actual = targetWord[i];
		const correct = guessed === actual; //&& !!guessed;

		if (!correct) {
			potentialOranges.push(actual);
			continue;
		}
	}
	return potentialOranges;
}

export default Word;
