import { useCallback, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

type Props = {
	disabled?: boolean;
	handleBackspace: () => void;
	handleLetter: (letter: string) => void;
	handleEnter: () => void;
};

// const StyledKeyboardContainer = styled.div`

// `

const CombinedKeyboard = ({ disabled = false, handleBackspace, handleLetter, handleEnter }: Props) => {
	// const keyboard = useRef<SimpleKeyboard>();

	const handlePhysicalKeyUp = useCallback(
		(e: KeyboardEvent) => {
			console.log(e.code);
			console.log(e.key);
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

	const keyboardLayout = { default: ["q w e r t y u i o p", "a s d f g h j k l", "z x c v b n m {bksp} {enter}"] };

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

	return (
		<Keyboard
			// keyboardRef={(r) => (keyboard.current = r)}
			layout={keyboardLayout}
			onKeyPress={onVirtualKeyboardPress}
		/>
	);
};

export default CombinedKeyboard;
