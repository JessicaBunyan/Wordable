import GameContainer from "./Components/GameContainer";
import TopBar from "./Components/TopBar";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div>
			<TopBar />
			<GameContainer />;
			<Toaster
				toastOptions={{
					position: "bottom-right",
					className: "toast",
					error: {
						style: {
							background: "var(--red)",
							color: "white",
						},
					},
				}}
			/>
		</div>
	);
}
export default App;
