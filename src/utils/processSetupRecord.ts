import Fuse from "fuse.js";
import { GLOBAL_MAX_LETTERS } from "../App";
import englishDictionary from "../GameFiles/englishDictionary";
import getKeyboardLayout from "./getKeyboardLayout";

const alphabet = "abcdefghijklmnopqrstuvwxyz";
const alphabetArray = alphabet.split("");

export default function processSetupRecord(record: TGameSetupRecord): TGameSetup {
	const processed: TGameSetup = {
		id: record.id,
		title: record.title,
		icon: record.icon,
		entityName: record.entityName,
		suggestions: record.suggestions,
		answers: [],
		helpItems: [...(record.helpItems || [])],
		keyboardLayout: { default: [] },
		characterLimit: 0,
		validCharacters: [],
		invalidWordMessage: "",
	};

	const omittedAnswers = record.answers.filter((a) => a.length > GLOBAL_MAX_LETTERS);
	processed.answers = record.answers.filter((a) => a.length <= GLOBAL_MAX_LETTERS).map((a) => a.toLowerCase());

	const helpItems = [...(record.helpItems || [])];
	omittedAnswers.length &&
		helpItems.push(
			"The following answers are excluded from the possible answer set due to length: " + omittedAnswers.join(", "),
		);

	processed.characterLimit = processed.answers.reduce((max, curr) => Math.max(curr.length, max), 0);

	let wordList: string[] | null = null;
	if (record.validWords === "answers") {
		wordList = processed.answers;
	}
	if (record.validWords === "english-dictionary") {
		wordList = englishDictionary;
	}
	if (Array.isArray(record.validWords)) {
		wordList = record.validWords;
	}

	if (wordList) {
		processed.wordSet = new Set(wordList);
		processed.invalidWordMessage = `Only valid ${record.entityName} names are allowed`;
		if (record.suggestions === "to-answers") {
			processed.fuse = new Fuse<string>(wordList, { threshold: 0.35 });
		}
	}

	const allCharsSet = new Set<string>(alphabetArray);
	processed.answers.forEach((a) => a.split("").forEach((l) => allCharsSet.add(l)));
	processed.validCharacters = Array.from(allCharsSet);
	alphabetArray.forEach((a) => allCharsSet.delete(a));
	const specialCharacters = Array.from(allCharsSet);
	processed.keyboardLayout = getKeyboardLayout(specialCharacters);

	return processed;
}
