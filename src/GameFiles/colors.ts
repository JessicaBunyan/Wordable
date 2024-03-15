import { TGameSetupRecord } from "../App";

const colourList = [
	"red",
	"orange",
	"yellow",
	"green",
	"cyan",
	"blue",
	"magenta",
	"purple",
	"white",
	"black",
	"grey",
	"silver",
	"pink",
	"maroon",
	"brown",
	"beige",
	"tan",
	"peach",
	"lime",
	"olive",
	"turquoise",
	"teal",
	"indigo",
	"violet",
];

const colours: TGameSetupRecord = {
	answers: colourList,
	title: "Colourable",
	validWords: "english-dictionary",
	entityName: "colour",
};

export default colours;
