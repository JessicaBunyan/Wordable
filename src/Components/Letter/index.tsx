import React from "react";
import styled from "styled-components";

type Props = {
	color: string;
	index: number;
	letter: string;
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

export default function Letter({ color, letter }: Props) {
	const border = "1";
	return (
		<StyledContainer $color={color} $border={border}>
			{letter}
		</StyledContainer>
	);
}
