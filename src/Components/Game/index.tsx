import { useCallback, useMemo, useState } from "react";

import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";
import englishDictionary from "../../GameFiles/englishDictionary";
import winAnimation from "../../utils/winAnimation";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";
import Fuse from "fuse.js";

import toast from "react-hot-toast";
import capitaliseWord from "../../utils/capitaliseWord";

export const MAX_ANSWER_LENGTH = 10;

export type TGameOptions = { answer: string; maxGuesses?: number; validWords: string[] | "english-dictionary" | null };

const StyledWordRacks = styled.div`
	padding: 0.25rem;
	font-size: 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	height: 22rem;
	flex-grow: 1;
`;

const StyledInstruction = styled.h2`
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const Game = ({ answer, maxGuesses = 5, validWords = null }: TGameOptions) => {
	const [wordSet, fuse] = useMemo(() => {
		switch (validWords) {
			case "english-dictionary":
				return [new Set(englishDictionary), new Fuse(englishDictionary, { includeScore: true })];
			case null:
				return [null, null];
			default:
				return [new Set(validWords), new Fuse(validWords, { threshold: 0.25 })];
		}
	}, [validWords]);

	const [knownMinLength, setKnownMinLength] = useState(0);
	const [knownMaxLength, setKnownMaxLength] = useState(MAX_ANSWER_LENGTH);

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

	const trySubmit = useCallback(() => {
		if (wordSet && !wordSet.has(currentGuess)) {
			const searchResults = fuse.search(currentGuess).filter((e) => e.item.length <= knownMaxLength);
			if (searchResults[0]) {
				toast("Did you mean " + capitaliseWord(searchResults[0].item) + "?");
			}
			toast.error("Only valid pokemon names are allowed");
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
		if (currentGuess === answer) {
			setGameState("WIN");
			winAnimation();
		} else if (prevGuesses.length >= maxGuesses) {
			setGameState("LOSS");
		} else if (currentGuess.length === answer.length) {
			setKnownMaxLength(answer.length);
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
		knownMaxLength,
	]);

	const handleBackspace = useCallback(() => {
		const updated = currentGuess.substring(0, currentGuess.length - 1);
		setCurrentGuess(updated);
	}, [currentGuess, setCurrentGuess]);

	const handleLetter = useCallback(
		(letter: string) => {
			if (currentGuess.length < knownMaxLength) {
				setCurrentGuess(currentGuess + letter);
			}
		},
		[currentGuess, setCurrentGuess, knownMaxLength],
	);

	return (
		<div id="game">
			<StyledWordRacks>
				{prevGuesses.map((guess, index) => (
					<Word
						key={index}
						current={guess}
						target={answer}
						complete={true}
						knownMinLength={knownMinLength}
						knownMaxLength={knownMaxLength}
					/>
				))}
				{!gameState && (
					<Word
						current={currentGuess}
						target={answer}
						complete={false}
						knownMinLength={knownMinLength}
						knownMaxLength={knownMaxLength}
					/>
				)}
			</StyledWordRacks>

			<StyledInstruction>
				{gameState ? (
					gameState === "WIN" ? (
						"Congrats!"
					) : (
						<>
							<span style={{ textTransform: "capitalize" }}>{answer}!</span> Better luck next time..
						</>
					)
				) : knownMaxLength === MAX_ANSWER_LENGTH ? (
					"Enter a pokemon... (1st gen)"
				) : (
					<>It has {knownMaxLength} letters!</>
				)}
			</StyledInstruction>

			<CombinedKeyboard
				disabled={gameState !== ""}
				handleEnter={trySubmit}
				handleBackspace={handleBackspace}
				handleLetter={handleLetter}
				greens={greenLetters}
				oranges={orangeLetters}
				greys={greyLetters}
			/>
		</div>
	);
};
export default Game;
