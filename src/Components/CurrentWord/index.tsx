import React from "react";
import styled from "styled-components";
import { ReactNode } from "react";
import Letter from "../Letter";
import { MAX_ANSWER_LENGTH } from "../Game";

type Props = { current: string; knownMinLength: number; knownMaxLength: number };

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

const CurrentWord = ({ current, knownMinLength = 0, knownMaxLength = MAX_ANSWER_LENGTH }: Props) => {
	const userKnowsLength = knownMaxLength === MAX_ANSWER_LENGTH; // TODO doesn't work for when its actually that long
	const letters: any = [];

	// console.log("current word", current);
	// current.split("").forEach((letter, index) => {

	// })

	for (let i = 0; i < knownMaxLength; i++) {
		const guess = current[i];
		const color = "rgb(150,150,150)";
		// let border = "none"; //"solid 1px var(--border)";
		letters.push(<Letter index={i} key={i} color={color} letter={current[i]} />);
	}

	return <StyledWord>{letters}</StyledWord>;
};

export default CurrentWord;
