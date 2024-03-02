import { ReactNode } from "react";
import Letter from "../Letter";
import styled from "styled-components";

type Props = { target: string; current: string; complete: boolean; knownMinLength: number; knownMaxLength: number };

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

const Word = ({ target, current, complete, knownMinLength = 0, knownMaxLength = 15 }: Props) => {
	const userKnowsLength = knownMaxLength === target.length;
	const letters = [];
	for (let i = 0; i < 15; i++) {
		if (complete && !current[i]) {
			continue;
		}
		if (!complete && userKnowsLength && i >= target.length) {
			continue;
		}
		letters.push(
			<Letter
				index={i}
				key={i}
				guess={current[i]}
				actual={target[i]}
				complete={complete}
				targetWord={target}
				knownMinLength={knownMinLength}
				showOpacity={!userKnowsLength}
			/>,
		);
	}

	let endMarker: ReactNode = null;

	if (complete) {
		if (target.length === current.length) {
			endMarker = <StyledCorrectEndMarker>◆</StyledCorrectEndMarker>;
		} else {
			endMarker = <StyledEndMarker>◆</StyledEndMarker>;
		}
	}

	return (
		<StyledWord>
			{letters}
			{endMarker}
		</StyledWord>
	);
};

export default Word;
