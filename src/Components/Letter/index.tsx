import React from "react";
import styles from "./Letter.module.css";
import cx from "classnames";
import getFlipDuration from "../../utils/getFlipDuration";

type Props = {
	state: TLetterState;
	index: number;
	letter: string;
	vanish?: boolean;
};

export default function Letter({ index, state, letter, vanish }: Props) {
	const display = letter === " " ? "•" : letter;
	const submitted = state !== "default";

	const cn = cx(styles.letter, styles[state], {
		[styles.empty]: !letter && state === "default",
		[styles.submitted]: submitted,
	});

	const flipDuration = getFlipDuration();

	const baseDelay = submitted && letter && state !== "nonExistent" ? index * flipDuration : 0;
	const animationDelay = `${baseDelay}ms`;
	const colourChangeDelay = submitted ? `${baseDelay + flipDuration * 0.5}ms` : "0ms";

	return (
		<span
			className={cn}
			aria-hidden={vanish}
			style={{ animationDelay: animationDelay, transitionDelay: colourChangeDelay }}>
			<span className={styles.glyph}>{display}</span>
			{/* {letter} */}
		</span>
	);
}
