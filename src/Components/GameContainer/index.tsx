import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import pokemon from "../../GameFiles/pokemon";
import randElement from "../../utils/randElement";
import Game from "../Game";

const StyledButton = styled.button`
	padding: 1rem;
	font-size: 1rem;
	margin-left: calc(50% - 100px);
	width: 200px;
`;

function GameContainer() {
	const [target, setTarget] = useState(randElement(pokemon));
	const validWords = pokemon;
	const button = useRef<HTMLButtonElement>(null);

	const onReset = useCallback(() => {
		setTarget(randElement(pokemon));
		button.current?.blur();
	}, [button, setTarget]);

	console.log(target);
	return (
		<div>
			<div className="game-container">{target && <Game key={target} word={target} validWords={validWords} />}</div>
			<StyledButton ref={button} onClick={onReset}>
				Reset / New Game
			</StyledButton>
		</div>
	);
}

export default GameContainer;
