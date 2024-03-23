import { memo, useCallback, useEffect } from "react";
import "./keyboard.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

type Props = {
	validCharacters: string[];
	keyboardLayout: { default: string[] };
	disabled?: boolean;
	handleBackspace: () => void;
	handleLetter: (letter: string) => void;
	handleEnter: () => void;
	correctLetters: string[];
	misplacedLetters: string[];
	incorrectLetters: string[];
	currentGuessLetters: string[];
	// style: React.CSSProperties;
};

const CombinedKeyboard = ({
	validCharacters,
	keyboardLayout,
	disabled = false,
	handleBackspace,
	handleLetter,
	handleEnter,
	correctLetters,
	misplacedLetters,
	incorrectLetters,
	currentGuessLetters,
}: // style,
Props) => {
	const handlePhysicalKeyUp = useCallback(
		(e: KeyboardEvent) => {
			if (e.code === "Backspace") {
				!disabled && handleBackspace();
				return;
			}
			if (e.code === "Enter") {
				!disabled && handleEnter();
				return;
			}
			if (validCharacters.indexOf(e.key.toLowerCase()) !== -1) {
				!disabled && handleLetter(e.key.toLowerCase());
				return;
			}
		},
		[handleBackspace, handleEnter, handleLetter, disabled, validCharacters],
	);

	useEffect(() => {
		document.addEventListener("keyup", handlePhysicalKeyUp);
		return () => document.removeEventListener("keyup", handlePhysicalKeyUp);
	}, [handlePhysicalKeyUp]);

	const onVirtualKeyboardPress = useCallback(
		(button: string) => {
			if (disabled) {
				return;
			}
			switch (button) {
				case "{enter}":
					handleEnter();
					return;
				case "{bksp}":
					handleBackspace();
					return;
				case "{space}":
					handleLetter(" ");
					return;
				default:
					handleLetter(button.toLowerCase());
			}
		},
		[disabled, handleBackspace, handleEnter, handleLetter],
	);

	const buttonThemes = [];
	if (correctLetters.length) {
		buttonThemes.push({
			buttons: correctLetters.join(" "),
			class: "correct",
		});
	}
	if (misplacedLetters.length) {
		buttonThemes.push({
			buttons: misplacedLetters.join(" "),
			class: "misplaced",
		});
	}
	if (incorrectLetters.length) {
		buttonThemes.push({
			buttons: incorrectLetters.join(" "),
			class: "incorrect",
		});
	}
	if (currentGuessLetters.length) {
		buttonThemes.push({
			buttons: currentGuessLetters.join(" "),
			class: "currentGuess",
		});
	}

	return (
		<Keyboard
			theme="hg-theme-default keyboard"
			layout={keyboardLayout}
			onKeyPress={onVirtualKeyboardPress}
			layoutName="default"
			display={{
				"{bksp}": "⌫",
				"{enter}": "↵",
				"{space}": "⎵",
			}}
			buttonTheme={buttonThemes}
		/>
	);
};

export default memo(CombinedKeyboard);
