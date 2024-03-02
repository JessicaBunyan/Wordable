import Letter from "../Letter";
import styled from "styled-components";

type Props = { target: string; current: string; complete: boolean };

const StyledWord = styled.div`
	display: flex;
	width: 100%;
	height: 4rem;
	gap: 4px;
`;

const Word = ({ target, current, complete }: Props) => {
	return (
		<StyledWord>
			{[...current].map((letter, index) => (
				<Letter key={index} guess={letter} actual={target[index]} complete={complete} targetWord={target} />
			))}
		</StyledWord>
	);
};

export default Word;
