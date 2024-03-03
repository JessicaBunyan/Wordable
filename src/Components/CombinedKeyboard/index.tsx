import { useCallback, useEffect } from "react";
import "./keyboard.css";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

type Props = {
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
			if ("abcdefghijklmnopqrstuvwxyz".indexOf(e.key.toLowerCase()) !== -1) {
				!disabled && handleLetter(e.key.toLowerCase());
				return;
			}

			console.log("invalid character");
		},
		[handleBackspace, handleEnter, handleLetter, disabled],
	);

	useEffect(() => {
		document.addEventListener("keyup", handlePhysicalKeyUp);
		return () => document.removeEventListener("keyup", handlePhysicalKeyUp);
	}, [handlePhysicalKeyUp]);

	const keyboardLayout = { default: ["q w e r t y u i o p", "a s d f g h j k l", "{bksp} z x c v b n m {enter}"] };

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
				default:
					handleLetter(button.toLowerCase());
			}
		},
		[disabled, handleBackspace, handleEnter, handleLetter],
	);

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

	console.log(buttonThemes);
	return (
		<Keyboard
			// keyboardRef={(r) => (keyboard.current = r)}
			theme="hg-theme-default keyboard"
			layout={keyboardLayout}
			onKeyPress={onVirtualKeyboardPress}
			display={{
				"{bksp}": "⌫",
				"{enter}": "↵",
			}}
			buttonTheme={buttonThemes}
		/>
	);
};

export default CombinedKeyboard;
