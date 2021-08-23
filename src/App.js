import React, { useState, useEffect } from "react";
import Movies from "./components/movies";

function App() {
	const [data, setData] = useState([]);
	const [loading, isLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			let res = await fetch("https://swapi.dev/api/films");
			let apiData = await res.json();

			setData(apiData.results);

			setData((currentList) => [
				...currentList.sort((s, w) => s.release_date - w.release_date),
			]);
			isLoading(true);
		};
		fetchData();
	}, []);

	const loadingPage = () => {
		return (
			<div className="App">
				<p>Loading....</p>
			</div>
		);
	};

	const pageLoaded = () => {
		return (
			<div className="App">
				{data.map((info, index) => (
					<Movies
						key={index}
						titles={info.title}
						characters={info.characters}
						releaseDate={info.release_date}
					/>
				))}
			</div>
		);
	};

	return <>{loading ? pageLoaded() : loadingPage()}</>;
}

export default App;
