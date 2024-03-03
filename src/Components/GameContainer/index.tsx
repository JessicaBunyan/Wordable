import { useState } from "react";
import Game from "../Game";
import pokemon from "../../GameFiles/pokemon";
import randInt from "../../utils/randInt";
import randElement from "../../utils/randElement";
import styled from "styled-components";

const StyledButton = styled.button`
	padding: 1rem;
	font-size: 1rem;
	margin-left: calc(50% - 100px);
	width: 200px;
`;

function GameContainer() {
	console.log(pokemon);
	console.log(randInt(0, pokemon.length - 1));
	const [target, setTarget] = useState(randElement(pokemon));
	const validWords = pokemon;
	console.log(target);
	return (
		<div>
			<div className="game-container">{target && <Game key={target} word={target} validWords={validWords} />}</div>
			<StyledButton onClick={() => setTarget(randElement(pokemon))}>Reset / New Game</StyledButton>
		</div>
	);
}

export default GameContainer;
