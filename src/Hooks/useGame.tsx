import { useCallback, useMemo, useState } from "react";

import toast from "react-hot-toast";
import "react-simple-keyboard/build/css/index.css";
import capitaliseWord from "../utils/capitaliseWord";
import winAnimation from "../utils/winAnimation";
import uniqueLettersInWord from "../utils/uniqueLettersInWord";

export default function useGame(options: TGameOptions) {
	const { answer, fuse, entityName, wordSet, invalidWordMessage, maxGuesses = 5, characterLimit } = options;

	const [knownMinLength, setKnownMinLength] = useState(3);
	const [knownAnswerLength, setKnownAnswerLength] = useState<number | undefined>(undefined);
	const maxSubmitLength = Math.min(knownAnswerLength || characterLimit);

	const [currentWordLetters, setCurrentWordLetters] = useState<string[]>([]);
	const [correctLetters, setCorrectLetters] = useState<string[]>([]);
	const [misplacedLetters, setMisplacedLetters] = useState<string[]>([]);
	const [incorrectlyGuessedLetters, setIncorrectLetters] = useState<string[]>([]);
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
			const greens = new Set(correctLetters);
			const oranges = new Set(misplacedLetters);
			const greys = new Set(incorrectlyGuessedLetters);

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
			setMisplacedLetters(Array.from(oranges));
			setCorrectLetters(Array.from(greens));
			setIncorrectLetters(Array.from(greys));
		},
		[
			correctLetters,
			misplacedLetters,
			incorrectlyGuessedLetters,
			setIncorrectLetters,
			setMisplacedLetters,
			setCorrectLetters,
		],
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
		setCurrentWordLetters([]);
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
		setCurrentWordLetters,
		updateKeyboardColours,
		fuse,
		maxSubmitLength,
		invalidWordMessage,
	]);

	const handleBackspace = useCallback(() => {
		const updated = currentGuess.substring(0, currentGuess.length - 1);
		setCurrentWordLetters(uniqueLettersInWord(updated));
		setCurrentGuess(updated);
	}, [currentGuess, setCurrentGuess]);

	const handleLetter = useCallback(
		(letter: string) => {
			if (currentGuess.length < maxSubmitLength) {
				setCurrentWordLetters(uniqueLettersInWord(currentGuess + letter));
				setCurrentGuess(currentGuess + letter);
			}
		},
		[currentGuess, setCurrentGuess, maxSubmitLength, setCurrentWordLetters],
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
		misplacedLetters,
		correctLetters,
		incorrectlyGuessedLetters,
		currentWordLetters,
		message,
	};
}
