import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utils/api";
import { API_BASE } from "../../utils/apiBase";
import Loader from "../Loader";
import processSetupRecord from "../../utils/processSetupRecord";
import GamePage from "../GamePage";

const LoadGame = () => {
	const { gameID } = useParams<{ gameID: string }>();
	const [httpError, setHttpError] = useState("");
	const [game, setGame] = useState<TGameSetup | undefined>(undefined);

	useEffect(() => {
		const loadGame = async () => {
			try {
				const gameDef = await get<TGameSetupRecord>(`${API_BASE}game/${gameID}`);
				console.log(gameDef);
				const processedGame = processSetupRecord(gameDef);
				setGame(processedGame);
			} catch (e) {
				setHttpError("" + (e as HTTPError)?.code || "unknown");
			}
		};

		loadGame();
	}, [gameID]);

	if (!gameID || httpError === "404") {
		return <p>404</p>;
	}

	if (!game) {
		return <Loader />;
	}

	return <GamePage {...game} />;
};

export default LoadGame;
