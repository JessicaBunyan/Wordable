import React, { ReactNode } from "react";
import { MAX_ANSWER_LENGTH } from "../Game";
import Letter from "../Letter";
import styled from "styled-components";
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
};

const StyledWord = styled.div<{ $fraction: number; $fadeStart: number }>`
	@keyframes appear {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	display: flex;
	/* width: 100%; */
	height: 3rem;
	line-height: 3rem;
	font-size: 1.5rem;
	margin: 4px;
	opacity: 0;
	animation: appear ease-out 300ms 300ms forwards;
	position: relative;

	&:after {
		position: absolute;
		/* display: ${(props) => (props.$fadeStart ? "none" : "block")}; */
		content: "";
		height: 100%;
		top: 0;
		left: ${(props) => props.$fraction * props.$fadeStart + "%"};
		width: ${(props) => `calc(${100 - props.$fraction * props.$fadeStart}% - 2rem)`};
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 1) 100%);
		background-repeat: no-repeat;
		background-size: cover;
	}
`;

const Word = ({
	isCurrent,
	targetWord,
	submittedWord,
	knownMaxLength,
	knownMinLength,
	charWidth,
	maxSubmitLength,
}: Props) => {
	const fadeStart = Math.max(knownMinLength, submittedWord.length, knownMaxLength || 0);

	const letters = isCurrent
		? getCurrentWordLetters(submittedWord, charWidth, maxSubmitLength)
		: getSubmittedWordLetters(targetWord, submittedWord, charWidth);

	return (
		<StyledWord $fraction={100 / (charWidth + 1)} $fadeStart={fadeStart}>
			{letters}
			<EndMarker
				guessedWord={submittedWord}
				submitted={!isCurrent}
				targetWord={targetWord}
				knownMaxLength={knownMaxLength}
			/>
		</StyledWord>
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
		const color = i >= maxAnswerLength ? "white" : "rgb(150,150,150)";
		// let border = "none"; //"solid 1px var(--border)";
		letters.push(<Letter index={i} key={i} color={color} letter={guess} />);
	}
	return letters;
}

function getSubmittedWordLetters(targetWord: string, current: string, maxAnswerLength: number) {
	const letters: ReactNode[] = [];

	const potentialOranges: string[] = getPotentialOranges(targetWord, current);

	for (let i = 0; i < MAX_ANSWER_LENGTH; i++) {
		const guessed = current[i];
		const actual = targetWord[i];
		let color = "rgb(150,150,150)";
		if (!guessed) {
			letters.push(<Letter index={i} key={i} color={"white"} letter={""} vanish={i >= maxAnswerLength} />);
			continue;
		}
		if (guessed === actual) {
			color = "var(--green)";
		} else if (targetWord.indexOf(guessed) > -1 && potentialOranges.find((l) => l === guessed)) {
			color = "var(--orange)";
			potentialOranges.splice(
				potentialOranges.findIndex((l) => l === guessed),
				1,
			);
		}
		letters.push(<Letter index={i} key={i} color={color} letter={current[i]} />);
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
