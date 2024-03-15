import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../utils/apiBase";

const LoadGame = () => {
	const { gameID } = useParams<{ gameID: string }>();

	useEffect(() => {
		const loadGame = async () => {
			const response = await fetch(`${API_BASE}game/${gameID}`);
			const json = await response.json();
			console.log(json);
		};

		loadGame();
	}, [gameID]);

	if (!gameID) {
		return <p>404</p>;
	}
	return <div>{gameID}</div>;
};

export default LoadGame;
