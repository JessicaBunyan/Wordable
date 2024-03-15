import { TGameSetupRecord } from "../App";
import colours from "./colors";
import europeanCountries from "./europeanCountries";
import pokemon from "./pokemon";
import usStates from "./usStates";

const premadeGames: { [key: string]: TGameSetupRecord } = {
	pokemon: pokemon,
	"/": pokemon,
	colours: colours,
	states: usStates,
	europeanCountries: europeanCountries,
};

export default premadeGames;
