import { useCallback, useEffect } from "react";
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
	greens: string[];
	oranges: string[];
	greys: string[];
};

// const StyledKeyboardContainer = styled.div`

// `

const CombinedKeyboard = ({
	validCharacters,
	keyboardLayout,
	disabled = false,
	handleBackspace,
	handleLetter,
	handleEnter,
	greens,
	oranges,
	greys,
}: Props) => {
	// const keyboard = useRef<SimpleKeyboard>();

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

	console.log(keyboardLayout);

	const buttonThemes = [];
	if (greens.length) {
		buttonThemes.push({
			buttons: greens.join(" "),
			class: "green",
		});
	}
	if (oranges.length) {
		buttonThemes.push({
			buttons: oranges.join(" "),
			class: "orange",
		});
	}
	if (greys.length) {
		buttonThemes.push({
			buttons: greys.join(" "),
			class: "grey",
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

export default CombinedKeyboard;
