import React, { MutableRefObject, useCallback, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Word from "../Word";
import styled from "styled-components";

type Props = { word: string; maxGuesses?: number };

const StyledWordRacks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	height: 20rem;
`;

const Game = ({ word, maxGuesses = 5 }: Props) => {
	const keyboardLayout = { default: ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m {bksp} {enter}"] };

	const [gameState, setGameState] = useState<"WIN" | "LOSS" | "">("");
	const [currentGuess, setCurrentGuess] = useState("");
	const [prevGuesses, setPrevGuesses] = useState<Array<string>>([]);
	const keyboard = useRef<any>();

	const onKeyPress = useCallback(
		(button: string, event?: MouseEvent) => {
			if (gameState || currentGuess === "") {
				return;
			}
			if (button === "{enter}") {
				setPrevGuesses([currentGuess, ...prevGuesses]);
				setCurrentGuess("");
				console.log(keyboard.current.clearInput());
				if (currentGuess === word) {
					setGameState("WIN");
				} else if (prevGuesses.length >= maxGuesses) {
					setGameState("LOSS");
				}
			}
		},
		[currentGuess, word, prevGuesses, gameState],
	);

	return (
		<div>
			<StyledWordRacks>
				<Word current={currentGuess} target={word} complete={false} />

				{prevGuesses.map((guess, index) => (
					<Word key={index} current={guess} target={word} complete={true} />
				))}
			</StyledWordRacks>

			<Keyboard
				keyboardRef={(r) => (keyboard.current = r)}
				layout={keyboardLayout}
				onChange={setCurrentGuess}
				onKeyPress={onKeyPress}
				maxLength={15}
			/>
		</div>
	);
};
export default Game;
