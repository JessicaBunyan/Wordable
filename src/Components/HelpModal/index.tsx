import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import styles from "./HelpModal.module.css";

type Props = {
	onClose: () => void;
	isOpen: boolean;
	gameOptions: TGameOptions;
};

function HelpModal({ isOpen, onClose, gameOptions }: Props) {
	const { helpItems = [] } = gameOptions;
	return (
		<ReactModal className={styles.help} isOpen={isOpen} overlayClassName={styles.helpOverlay}>
			<button onClick={onClose}>✖</button>
			<h1
				style={{
					fontSize: "1.5rem",
				}}>
				Help v0.2
			</h1>
			<ul>
				<li>This is in beta</li>
				<li>If the number goes green your guess was the correct length</li>
				<li>Reset will give you a new word</li>
				<li>Answers can be any length from 3-{gameOptions.characterLimit} chars</li>
				{helpItems.map((h, index) => (
					<li key={index}>{h}</li>
				))}
			</ul>
		</ReactModal>
	);
}

export default HelpModal;
