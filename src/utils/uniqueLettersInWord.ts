export default function uniqueLettersInWord(word: string | string[]) {
	const letterArray = Array.isArray(word) ? word : word.split("");
	return Array.from(new Set(letterArray));
}
