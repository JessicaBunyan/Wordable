import React, { useCallback, useMemo, useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import styled from "styled-components";
import CombinedKeyboard from "../CombinedKeyboard";
import Word from "../Word";
import englishDictionary from "../englishDictionary";

type Props = { word: string; maxGuesses?: number; validWords: string[] | "dictionary" | null };

const StyledWordRacks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	height: 20rem;
`;

const Game = ({ word, maxGuesses = 5, validWords = "dictionary" }: Props) => {
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

	const [currentGuess, setCurrentGuess] = useState("");
	const [gameState, setGameState] = useState<"WIN" | "LOSS" | "">("");
	const [prevGuesses, setPrevGuesses] = useState<Array<string>>([]);

	const trySubmit = useCallback(() => {
		if (wordSet && !wordSet.has(currentGuess)) {
			console.log("word not valid");
			return;
		}

		setPrevGuesses([currentGuess, ...prevGuesses]);
		setCurrentGuess("");
		if (currentGuess === word) {
			setGameState("WIN");
		} else if (prevGuesses.length >= maxGuesses) {
			setGameState("LOSS");
		}
	}, [setPrevGuesses, setCurrentGuess, setGameState, word, maxGuesses, wordSet, currentGuess, prevGuesses]);

	const handleBackspace = useCallback(() => {
		const updated = currentGuess.substring(0, currentGuess.length - 1);
		setCurrentGuess(updated);
	}, [currentGuess, setCurrentGuess]);

	const handleLetter = useCallback(
		(letter: string) => {
			setCurrentGuess(currentGuess + letter);
		},
		[currentGuess, setCurrentGuess],
	);

	return (
		<div>
			<StyledWordRacks>
				<Word current={currentGuess} target={word} complete={false} />

				{prevGuesses.map((guess, index) => (
					<Word key={index} current={guess} target={word} complete={true} />
				))}
			</StyledWordRacks>

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
