import randInt from "./randInt";

export default function randElement<T>(list: T[]): T {
	const index = randInt(0, list.length - 1);
	return list[index];
}
