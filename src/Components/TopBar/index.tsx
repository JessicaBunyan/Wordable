import React from "react";
import styled from "styled-components";

// type Props = {};

const StyledNav = styled.nav`
	border-bottom: solid 4px black;
	width: 100%;
	display: block;
	display: flex;
	height: 4rem;
	& li,
	div,
	h1,
	ul {
		flex-basis: 80px;
		font-weight: bold;
		padding: 0;
		font-size: 2rem;
		height: inherit;
		line-height: 4rem;
		/* margin: 0.5rem 0; */
		vertical-align: middle;
	}
`;
const StyledUL = styled.ul`
	display: flex;
	flex-grow: 2;
	justify-content: flex-end;
	justify-self: flex-end;
`;

const StyledLI = styled.li`
	padding: 4px;
	font-size: 2rem;
	font-weight: 400;
	display: block;

	&:last-child {
		margin-right: 3rem;
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
`;

const StyledH1 = styled.h1`
	justify-self: center;
`;

const TopBar = () => {
	return (
		<StyledNav>
			<StyledSpacer />
			<StyledH1>Pokemondle</StyledH1>
			<StyledUL>
				<StyledLI>{/* <a>?</a> */}</StyledLI>
			</StyledUL>
		</StyledNav>
	);
};

export default TopBar;
