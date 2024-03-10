import ReactModal from "react-modal";
import { MAX_ANSWER_LENGTH } from "../GameInstance";
import styled from "styled-components";
import { ReactNode } from "react";

type Props = {
	onClose: () => void;
	isOpen: boolean;
	helpItems: string[] | ReactNode[];
};

const StyledButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
	border: none;
	background: unset;
	font-size: 1.5rem;
`;

const StyledLi = styled.li`
	margin: 1rem;
`;

function HelpModal({ isOpen, onClose, helpItems }: Props) {
	return (
		<ReactModal isOpen={isOpen}>
			<StyledButton onClick={onClose}>✖</StyledButton>
			<h1
				style={{
					fontSize: "1.5rem",
				}}>
				Help v0.2
			</h1>
			<ul>
				<StyledLi>This is in beta</StyledLi>
				<StyledLi>If the number goes green your guess was the correct length</StyledLi>
				<StyledLi>Reset will give you a new word</StyledLi>
				<StyledLi>Answers can be any length from 3-{MAX_ANSWER_LENGTH} chars</StyledLi>
				{helpItems.map((h, index) => (
					<StyledLi key={index}>{h}</StyledLi>
				))}
			</ul>
		</ReactModal>
	);
}

export default HelpModal;
