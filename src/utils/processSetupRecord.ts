import { TGameSetupRecord, TGameSetup } from "../App";
import englishDictionary from "../GameFiles/englishDictionary";
import getKeyboardLayout from "./getKeyboardLayout";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export default function (record: TGameSetupRecord): TGameSetup {
	record.answers = record.answers.map((a) => a.toLowerCase());

	let validWords: string[] | null = null;

	if (record.validWords === "answers") {
		validWords = record.answers;
	}
	if (record.validWords === "english-dictionary") {
		validWords = englishDictionary;
	}

	const characterLimit = record.answers.reduce((max, curr) => Math.max(curr.length, max), 0);

	const allCharsSet = new Set<string>();
	record.answers.forEach((a) => a.split("").forEach((l) => allCharsSet.add(l)));
	const validCharacters = Array.from(allCharsSet);
	alphabet.split("").forEach((a) => allCharsSet.delete(a));
	const specialCharacters = Array.from(allCharsSet);
	const keyboardLayout = getKeyboardLayout(specialCharacters);

	return { ...record, characterLimit, validWords, validCharacters, keyboardLayout };
}
