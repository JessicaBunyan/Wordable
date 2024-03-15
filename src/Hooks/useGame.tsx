import { useCallback, useMemo, useState } from "react";
import { TGameOptions } from "../Components/GameInstance";

import Fuse from "fuse.js";
import toast from "react-hot-toast";
import "react-simple-keyboard/build/css/index.css";
import capitaliseWord from "../utils/capitaliseWord";
import winAnimation from "../utils/winAnimation";

export default function useGame(options: TGameOptions) {
	const { answer, entityName, validWords, maxGuesses = 5, suggestions, characterLimit } = options;

	const [wordSet, fuse, invalidWordMessage] = useMemo(() => {
		switch (validWords) {
			case null:
				return [null, null, null];
			default:
				return [
					new Set(validWords),
					suggestions ? new Fuse(validWords, { threshold: 0.25 }) : null,
					`Only valid ${entityName} names are allowed`,
				];
		}
	}, [validWords, entityName, suggestions]);

	const [knownMinLength, setKnownMinLength] = useState(0);
	const [knownAnswerLength, setKnownAnswerLength] = useState<number | undefined>(undefined);
	const maxSubmitLength = Math.min(knownAnswerLength || characterLimit);

	const [greenLetters, setGreenLetters] = useState<string[]>([]);
	const [orangeLetters, setOrangeLetters] = useState<string[]>([]);
	const [greyLetters, setGreyLetters] = useState<string[]>([]);
	const [currentGuess, setCurrentGuess] = useState("");
	const [gameState, setGameState] = useState<"WIN" | "LOSS" | "">("");
	const [prevGuesses, setPrevGuesses] = useState<Array<string>>([]);

	const calculateKnownMinLength = useCallback(() => {
		let newLatest = 0;
		for (let i = knownMinLength; i < currentGuess.length; i++) {
			if (currentGuess[i] === answer[i]) {
				newLatest = i;
			}
		}
		if (newLatest) {
			setKnownMinLength(newLatest + 1);
		}
	}, [currentGuess, setKnownMinLength, answer, knownMinLength]);

	const updateKeyboardColours = useCallback(
		(guess: string, target: string) => {
			const greens = new Set(greenLetters);
			const oranges = new Set(orangeLetters);
			const greys = new Set(greyLetters);

			for (let i = 0; i < guess.length; i++) {
				if (guess.charAt(i) === target.charAt(i)) {
					greens.add(guess.charAt(i));
				} else {
					if (target.indexOf(guess.charAt(i)) !== -1) {
						oranges.add(guess.charAt(i));
					} else {
						greys.add(guess.charAt(i));
					}
				}
			}
			setOrangeLetters(Array.from(oranges));
			setGreenLetters(Array.from(greens));
			setGreyLetters(Array.from(greys));
		},
		[greenLetters, orangeLetters, greyLetters, setGreyLetters, setOrangeLetters, setGreenLetters],
	);

	const handleSubmit = useCallback(() => {
		if (wordSet && !wordSet.has(currentGuess)) {
			if (fuse) {
				const searchResults = fuse.search(currentGuess).filter((e) => e.item.length <= maxSubmitLength);
				if (searchResults[0]) {
					toast("Did you mean " + capitaliseWord(searchResults[0].item) + "?");
				}
			}
			toast.error(invalidWordMessage);
			return;
		}
		if (prevGuesses.indexOf(currentGuess) !== -1) {
			toast.error("Already guessed that!");
			return;
		}

		calculateKnownMinLength();
		updateKeyboardColours(currentGuess, answer);
		setPrevGuesses([...prevGuesses, currentGuess]);
		setCurrentGuess("");
		if (currentGuess.length === answer.length) {
			setKnownAnswerLength(answer.length);
		}
		if (currentGuess === answer) {
			setGameState("WIN");
			winAnimation();
		} else if (prevGuesses.length >= maxGuesses) {
			setGameState("LOSS");
		}
	}, [
		setPrevGuesses,
		setCurrentGuess,
		setGameState,
		answer,
		maxGuesses,
		wordSet,
		currentGuess,
		prevGuesses,
		calculateKnownMinLength,
		updateKeyboardColours,
		fuse,
		maxSubmitLength,
		invalidWordMessage,
	]);

	const handleBackspace = useCallback(() => {
		const updated = currentGuess.substring(0, currentGuess.length - 1);
		setCurrentGuess(updated);
	}, [currentGuess, setCurrentGuess]);

	const handleLetter = useCallback(
		(letter: string) => {
			if (currentGuess.length < maxSubmitLength) {
				setCurrentGuess(currentGuess + letter);
			}
		},
		[currentGuess, setCurrentGuess, maxSubmitLength],
	);

	const charWidth = knownAnswerLength ? Math.max(...prevGuesses.map((m) => m.length)) : characterLimit;

	const gameRows = [...prevGuesses];
	if (!gameState) {
		gameRows.push(currentGuess);
	}

	// {gameState ? (
	//     gameState === "WIN" ? (
	//         "Congrats!"
	//     ) : (
	//         <>
	//             <span style={{ textTransform: "capitalize" }}>{answer}!</span> Better luck next time..
	//         </>
	//     )
	// ) : knownAnswerLength === MAX_ANSWER_LENGTH ? (
	//     "Enter a pokemon... (1st gen)"
	// ) : (
	//     <>It has {knownAnswerLength} letters!</>
	// )}

	const message = useMemo(() => {
		if (gameState) {
			return gameState === "WIN" ? (
				"Congrats!"
			) : (
				<>
					<span style={{ textTransform: "capitalize" }}>{answer}!</span> Better luck next time..
				</>
			);
		}

		if (knownAnswerLength) {
			return `It has ${knownAnswerLength} letters!`;
		}

		return "Enter a " + entityName;
	}, [gameState, knownAnswerLength, entityName, answer]);

	return {
		gameRows,
		charWidth,
		knownMinLength,
		knownAnswerLength,
		maxSubmitLength,
		gameState,
		handleSubmit,
		handleBackspace,
		handleLetter,
		orangeLetters,
		greenLetters,
		greyLetters,
		message,
	};
}
