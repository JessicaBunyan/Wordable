import React from "react";
import styled from "styled-components";

type Props = {
	guess: string;
	actual: string;
	complete: boolean;
	targetWord: string;
	index: number;
	knownMinLength: number;
	showOpacity: boolean;
};

const StyledContainer = styled.div<{ $color?: string; $border?: string }>`
	width: 2rem;
	/* height: 3.5rem; */
	/* line-height: 3.5rem; */
	background: ${(props) => props.$color};
	/* border: ${(props) => props.$border}; */
	/* border: solid 1px black; */
	/* font-size: 1.5rem; */
	text-transform: uppercase;
	margin: 0px;
	font-weight: bold;
`;

export default function Letter({ guess, actual, complete, targetWord, index, showOpacity, knownMinLength }: Props) {
	const correct = guess === actual && !!guess;
	const wrongPlace = targetWord.indexOf(guess) > -1;
	let color = "rgb(150,150,150)";
	let border = "none"; //"solid 1px var(--border)";
	if (complete) {
		if (correct) {
			color = "var(--green)";
		} else if (wrongPlace) {
			color = "var(--orange)";
		}
	} else {
		if (showOpacity) {
			const opacityIndex = index - Math.max(3, knownMinLength);
			if (opacityIndex >= 0) {
				const opacity = Math.min(0.5 - opacityIndex / (30 - knownMinLength), 1);
				color = `rgba(150,150,150, ${opacity})`;
				if (opacity !== 1) {
					border = "dashed 1px var(--border)";
				}
			}
		}
	}

	return (
		<StyledContainer $color={color} $border={border}>
			{guess}
		</StyledContainer>
	);
}
