import "./App.css";
import Game from "./Game";

function App() {
	return (
		<div className="App">
			<Game word="peanuts" validWords={"dictionary"} />
		</div>
	);
}

export default App;
