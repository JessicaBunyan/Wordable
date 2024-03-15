import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../utils/api";
import { API_BASE } from "../../utils/apiBase";
import Loader from "../Loader";

const LoadGame = () => {
	const { gameID } = useParams<{ gameID: string }>();
	const [httpError, setHttpError] = useState("");
	const [game, setGame] = useState<TGameSetupRecord | undefined>(undefined);

	useEffect(() => {
		const loadGame = async () => {
			try {
				const game = await get<TGameSetupRecord>(`${API_BASE}game/${gameID}`);
				console.log(game);
				setGame(game);
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

	return <div>{gameID}</div>;
};

export default LoadGame;
