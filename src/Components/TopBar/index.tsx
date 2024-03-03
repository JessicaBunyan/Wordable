import styled from "styled-components";

const StyledNav = styled.nav`
	border-bottom: solid 4px black;
	width: 100%;
	display: block;
	display: flex;
	height: var(--top-bar-height);

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
	@media screen and (max-width: 600px) {
		font-size: 1.5rem;
	}
`;

type Props = {
	onReset: () => void;
	setShowHelp: (show: boolean) => void;
};

const TopBar = ({ onReset, setShowHelp }: Props) => {
	return (
		<StyledNav>
			<StyledSpacer />
			<StyledH1>Pokemondle</StyledH1>
			<StyledUL>
				<StyledLI>
					<a onClick={() => setShowHelp(true)}>?</a>
				</StyledLI>
				<StyledLI>
					<a onClick={() => onReset()}>
						<svg height="28px" width="28px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							{/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
							<path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
						</svg>
						{/* <svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							className="bi bi-arrow-repeat"
							viewBox="0 0 16 16">
							<path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
							<path
								fillRule="evenodd"
								d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
							/>
						</svg> */}
					</a>
				</StyledLI>
			</StyledUL>
		</StyledNav>
	);
};

export default TopBar;
