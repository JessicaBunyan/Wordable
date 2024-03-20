import cx from "classnames";
import styles from "./EndMarker.module.css";

type Props = {
	submitted: boolean;
	targetWord: string;
	guessedWord: string;

	knownMaxLength?: number;
};
const EndMarker = ({ submitted, targetWord, guessedWord, knownMaxLength }: Props) => {
	const hide = !submitted && !guessedWord;
	const condClasses: Record<string, boolean> = { [styles.hide]: !!hide };

	if (submitted) {
		if (guessedWord.length === targetWord.length) {
			condClasses[styles.green] = true;
		} else {
			condClasses[styles.red] = true;
		}
	} else if (knownMaxLength) {
		if (knownMaxLength === guessedWord.length) {
			condClasses[styles.green] = true;
		} else {
			condClasses[styles.red] = true;
		}
	}
	const cn = cx(styles.endMarker, condClasses);

	return <span className={cn}>{guessedWord.length}</span>;
};

export default EndMarker;
