import React from "react";
import styles from "./Letter.module.css";
import cx from "classnames";

type Props = {
	state: TLetterState;
	index: number;
	letter: string;
	vanish?: boolean;
};

export default function Letter({ state, letter, vanish }: Props) {
	const display = letter === " " ? "•" : letter;

	const cn = cx(styles.letter, styles[state]);

	return (
		<span className={cn} aria-hidden={vanish}>
			{display}
			{/* {letter} */}
		</span>
	);
}
