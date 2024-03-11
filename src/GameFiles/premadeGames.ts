import { TGameSetupRecord } from "../App";
import colours from "./colors";
import pokemon from "./pokemon";
import usStates from "./usStates";

const premadeGames: { [key: string]: TGameSetupRecord } = {
	pokemon: pokemon,
	"/": pokemon,
	colours: colours,
	states: usStates,
};

export default premadeGames;
