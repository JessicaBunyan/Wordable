import { TGameSetupRecord, TGameSetup, GLOBAL_MAX_LETTERS } from "../App";
import englishDictionary from "../GameFiles/englishDictionary";
import getKeyboardLayout from "./getKeyboardLayout";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export default function (record: TGameSetupRecord): TGameSetup {
	const omittedAnswers = record.answers.filter((a) => a.length > GLOBAL_MAX_LETTERS);
	const helpItems = [...(record.helpItems || [])];
	const answers = record.answers.filter((a) => a.length <= GLOBAL_MAX_LETTERS).map((a) => a.toLowerCase());
	console.log(omittedAnswers);
	omittedAnswers.length &&
		helpItems.push(
			"The following answers are excluded from the possible answer set due to length: " + omittedAnswers.join(", "),
		);

	console.log(helpItems);
	const characterLimit = answers.reduce((max, curr) => Math.max(curr.length, max), 0);

	let validWords: string[] | null = null;

	if (record.validWords === "answers") {
		validWords = answers;
	}
	if (record.validWords === "english-dictionary") {
		validWords = englishDictionary;
	}

	const allCharsSet = new Set<string>();
	answers.forEach((a) => a.split("").forEach((l) => allCharsSet.add(l)));
	const validCharacters = Array.from(allCharsSet);
	alphabet.split("").forEach((a) => allCharsSet.delete(a));
	const specialCharacters = Array.from(allCharsSet);
	const keyboardLayout = getKeyboardLayout(specialCharacters);

	return {
		title: record.title,
		icon: record.icon,
		entityName: record.entityName,
		answers,
		helpItems,
		characterLimit,
		validWords,
		validCharacters,
		keyboardLayout,
	};
}
