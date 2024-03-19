import React from "react";
import GamePage from "../GamePage";
import processSetupRecord from "../../utils/processSetupRecord";
import { premadeGameLookup } from "../../GameFiles/premadeGames";

type Props = { id: string };

// processing a saved game into a real game can be expensive, do it on navigation rather than for all games ahead of time
const StaticGameLoader = ({ id }: Props) => {
	const gameSetup = premadeGameLookup[id];
	return <GamePage {...processSetupRecord(gameSetup)} />;
};

export default StaticGameLoader;
