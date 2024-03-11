import React from "react";
import styled from "styled-components";

type Props = {
	color: string;
	index: number;
	letter: string;
	vanish?: boolean;
};

const StyledContainer = styled.span<{ $color?: string; $vanish?: boolean }>`
	flex-basis: 0rem;
	flex-grow: ${(props) => (props.$vanish ? 0.0001 : 1)};
	margin-right: ${(props) => (props.$vanish ? 0 : "4px")};
	transition: flex-grow 300ms ease-out;
	background: ${(props) => props.$color};
	text-transform: uppercase;
	font-weight: bold;
	max-width: 2rem;
	&:after {
		/* content: "•"; */
	}
`;

export default function Letter({ color, letter, vanish }: Props) {
	const display = letter === " " ? "•" : letter;

	return (
		<StyledContainer $color={color} $vanish={vanish} aria-hidden={vanish}>
			{display}
			{/* {letter} */}
		</StyledContainer>
	);
}
