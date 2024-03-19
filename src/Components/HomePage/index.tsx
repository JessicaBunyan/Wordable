import { useEffect } from "react";
import "react-simple-keyboard/build/css/index.css";

const HomePage = () => {
	useEffect(() => {
		document.title = "TODO";
	}, []);

	return (
		<>
			<h1> welcome</h1>
		</>
	);
};
export default HomePage;
