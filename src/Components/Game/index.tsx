import { useCallback, useMemo, useState } from "react";

import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";
import englishDictionary from "../../GameFiles/englishDictionary";
import winAnimation from "../../utils/winAnimation";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";

import toast from "react-hot-toast";

export const MAX_ANSWER_LENGTH = 15;

type Props = { word: string; maxGuesses?: number; validWords: string[] | "dictionary" | null };

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

const Game = ({ word, maxGuesses = 5, validWords = null }: Props) => {
	const wordSet = useMemo(() => {
		switch (validWords) {
			case "dictionary":
				return new Set(englishDictionary);
			case null:
				return null;
			default:
				return new Set(validWords);
		}
	}, [validWords]);

	const [knownMinLength, setKnownMinLength] = useState(0);
	const [knownMaxLength, setKnownMaxLength] = useState(15);
	const [currentGuess, setCurrentGuess] = useState("");
	const [gameState, setGameState] = useState<"WIN" | "LOSS" | "">("");
	const [prevGuesses, setPrevGuesses] = useState<Array<string>>([]);

	const calculateKnownMinLength = useCallback(() => {
		let newLatest = 0;
		for (let i = knownMinLength; i < currentGuess.length; i++) {
			if (currentGuess[i] === word[i]) {
				newLatest = i;
			}
		}
		if (newLatest) {
			setKnownMinLength(newLatest + 1);
		}
	}, [currentGuess, setKnownMinLength, word, knownMinLength]);

	const trySubmit = useCallback(() => {
		if (wordSet && !wordSet.has(currentGuess)) {
			toast.error("Only valid pokemon names are allowed");
			return;
		}
		if (prevGuesses.indexOf(currentGuess) !== -1) {
			toast.error("Already guessed that!");
			return;
		}

		calculateKnownMinLength();
		setPrevGuesses([...prevGuesses, currentGuess]);
		setCurrentGuess("");
		if (currentGuess === word) {
			setGameState("WIN");
			winAnimation();
		} else if (prevGuesses.length >= maxGuesses) {
			setGameState("LOSS");
		} else if (currentGuess.length === word.length) {
			setKnownMaxLength(word.length);
		}
	}, [
		setPrevGuesses,
		setCurrentGuess,
		setGameState,
		word,
		maxGuesses,
		wordSet,
		currentGuess,
		prevGuesses,
		calculateKnownMinLength,
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
						target={word}
						complete={true}
						knownMinLength={knownMinLength}
						knownMaxLength={knownMaxLength}
					/>
				))}
				{!gameState && (
					<Word
						current={currentGuess}
						target={word}
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
							<span style={{ textTransform: "capitalize" }}>{word}!</span> Better luck next time..
						</>
					)
				) : knownMaxLength === 15 ? (
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
			/>
		</div>
	);
};
export default Game;
