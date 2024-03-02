import { useState } from "react";
import Game from "../Game";
import pokemon from "../../GameFiles/pokemon";
import randInt from "../../utils/randInt";

function GameContainer() {
	console.log(pokemon);
	console.log(randInt(0, pokemon.length - 1));
	const [target] = useState(pokemon[randInt(0, pokemon.length - 1)]);
	const validWords = pokemon;
	console.log(target);
	return <div className="game-container">{target && <Game word={target} validWords={validWords} />}</div>;
}

export default GameContainer;
