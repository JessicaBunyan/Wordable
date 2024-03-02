import React from "react";
import styled from "styled-components";

type Props = { guess: string; actual: string };

const StyledContainer = styled.div`
	width: 2.5rem;
	height: 4rem;
	line-height: 4rem;
	background: grey;
	font-size: 2rem;
	text-transform: uppercase;
`;

export default function Letter({ guess, actual }: Props) {
	return <StyledContainer>{guess}</StyledContainer>;
}
