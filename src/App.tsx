import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Letter from "./Letter";
import Game from "./Game";

function App() {
	return (
		<div className="App">
			<Game word="peanuts" />
		</div>
	);
}

export default App;
