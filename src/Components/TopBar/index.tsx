import styled from "styled-components";

const StyledNav = styled.nav`
	border-bottom: solid 4px black;
	width: 100%;
	display: block;
	display: flex;
	height: var(--top-bar-height);
	background: var(--nav-bg);
	/* background: var(--blue); */
	& * {
		flex-basis: 80px;
		font-weight: bold;
		padding: 0;
		font-size: 2rem;
		height: inherit;
		line-height: var(--top-bar-height);
		vertical-align: middle;
	}
	@media screen and (max-width: 600px) {
		& * {
			font-size: 1.5rem;
		}
	}
	& svg {
		height: 24px;
		width: 24px;
		padding-bottom: 6px;
	}
	/* &:after {
		content: " ";
		background: var(--blue);
		 /* width: var(--top-bar-height);
		width: 30%;
		height: var(--top-bar-height);
		position: absolute;
		top: 0;
		left: 0;
		clip-path: polygon(0 0, 0% 100%, 100% 0);

		/* z-index: 4; 
	} */
`;
const StyledUL = styled.ul`
	display: flex;
	flex-grow: 2;
	justify-content: flex-end;
	justify-self: flex-end;
`;

const StyledLI = styled.li`
	font-size: 2rem;
	font-weight: 400;
	display: block;
	max-width: 40px;

	&:last-child {
		margin-right: 2rem;
		@media screen and (max-width: 600px) {
			margin-right: 1rem;
		}
	}
	& a {
		width: 100%;
		height: 100%;
		display: block;
		text-align: center;
	}
`;

const StyledSpacer = styled.div`
	flex-grow: 2;
	@media screen and (max-width: 600px) {
		display: none;
	}
`;

const StyledH1 = styled.h1`
	justify-self: center;
	margin: 0 1rem;
	z-index: 2;
	@media screen and (max-width: 600px) {
		font-size: 1.5rem;
	}
`;

type Props = {
	title: string;
	onReset: () => void;
	setShowHelp: (show: boolean) => void;
};

const TopBar = ({ title, onReset, setShowHelp }: Props) => {
	return (
		<StyledNav>
			<StyledSpacer />
			<StyledH1>{title}</StyledH1>
			<StyledUL>
				<StyledLI>
					<a onClick={() => setShowHelp(true)}>?</a>
				</StyledLI>
				<StyledLI>
					<a onClick={() => onReset()}>
						<svg height="28px" width="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
						</svg>
					</a>
				</StyledLI>
			</StyledUL>
		</StyledNav>
	);
};

export default TopBar;
