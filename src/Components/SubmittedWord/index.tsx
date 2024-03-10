import { ReactNode } from "react";
import Letter from "../Letter";
import styled from "styled-components";
import { MAX_ANSWER_LENGTH } from "../Game";

type Props = { targetWord: string; submittedWord: string };

const StyledWord = styled.div`
	display: flex;
	width: 100%;
	height: 3rem;
	line-height: 3rem;
	font-size: 1.5rem;
	gap: 4px;
	margin: 4px;
`;

const StyledEndMarker = styled.div`
	/* border: solid 2px black; */
	/* border-left: none; */
	/* width: 0.5rem; 
	line-height: 100%;
	height: 100%; */
	color: var(--red);
	font-size: 2rem;
`;

const StyledCorrectEndMarker = styled(StyledEndMarker)`
	color: var(--green);
`;

const SubmittedWord = ({ targetWord, submittedWord: current }: Props) => {
	const letters: ReactNode[] = [];

	const potentialOranges: string[] = getPotentialOranges(targetWord, current);

	for (let i = 0; i < MAX_ANSWER_LENGTH; i++) {
		const guessed = current[i];
		const actual = targetWord[i];
		let color = "rgb(150,150,150)";
		if (!guessed) {
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

	let endMarker: ReactNode = null;

	if (targetWord.length === current.length) {
		endMarker = <StyledCorrectEndMarker>◆</StyledCorrectEndMarker>;
	} else {
		endMarker = <StyledEndMarker>◆</StyledEndMarker>;
	}

	return (
		<StyledWord>
			{letters}
			{endMarker}
		</StyledWord>
	);
};

export default SubmittedWord;

/**
  
 * Returns a list of letters which could be marked as orange in the submitted word
 * 
 * If guessed word has more "A"s than the answer does, they should not all be highlighted.
 * This goes the answer and adds each letter to `potentialOranges` for each non-green occurence in the answer.
 * 
 */
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
