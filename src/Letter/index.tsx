import React from "react";
import styled from "styled-components";

type Props = { guess: string; actual: string; complete: boolean; targetWord: string };

const StyledContainer = styled.div<{ $color?: string }>`
	width: 2.5rem;
	height: 4rem;
	line-height: 4rem;
	background: ${(props) => props.$color};
	font-size: 2rem;
	text-transform: uppercase;
`;

export default function Letter({ guess, actual, complete, targetWord }: Props) {
	const correct = guess === actual;
	const wrongPlace = targetWord.indexOf(guess) > -1;
	let color = "grey";
	if (complete) {
		if (correct) {
			color = "green";
		} else if (wrongPlace) {
			color = "orange";
		}
	}

	return <StyledContainer $color={color}>{guess}</StyledContainer>;
}
