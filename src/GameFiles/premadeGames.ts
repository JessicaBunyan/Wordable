import colours from "./colors";
import europeanCountries from "./europeanCountries";
import pokemon from "./pokemon";
import usStates from "./usStates";

export const premadeGames = [pokemon, colours, usStates, europeanCountries];
const lookup: Record<string, TGameSetupRecord> = {};
premadeGames.map((g) => (lookup[g.id] = g));
export const premadeGameLookup = lookup;
