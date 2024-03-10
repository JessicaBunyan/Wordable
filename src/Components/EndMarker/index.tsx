import styled from "styled-components";

type Props = {
	submitted: boolean;
	targetWord: string;
	guessedWord: string;
	knownMaxLength?: number;
};

const StyledEndMarker = styled.span<{ $color: string; $hide: boolean }>`
	flex-basis: 0;
	flex-grow: 1;
	color: ${(props) => props.$color || "var(--grey)"};
	opacity: ${(props) => (props.$hide ? "0" : "1")};
	font-weight: bold;
	font-family: serif;
	font-size: 1.75rem;
	transition: all 300ms;
	text-align: right;
	margin-right: 4px;
	position: relative;
	min-width: 2rem;
`;

const EndMarker = ({ submitted, targetWord, guessedWord, knownMaxLength }: Props) => {
	const hide = !submitted && !guessedWord;
	let color = "";

	if (submitted) {
		color = guessedWord.length === targetWord.length ? "var(--green)" : "var(--red)";
	} else if (knownMaxLength) {
		color = knownMaxLength === guessedWord.length ? "var(--green)" : "var(--red)";
	}

	return (
		<StyledEndMarker $color={color} $hide={!!hide}>
			{guessedWord.length}
		</StyledEndMarker>
	);
};

export default EndMarker;
