import React, { useState, useEffect } from "react";

const Movies = (props) => {
	const { titles, characters, releaseDate } = props;

	const [watchSpecific, setWatchSpecific] = useState(true);
	const [characterName, setCharacterName] = useState([]);

	// instead of using a,b in several arrow functions in map() etc i use s,w to symbolise the star wars theme

	useEffect(() => {
		let tempArray = [];
		const fetchNames = async (charactersUrl) => {
			let response = await fetch(charactersUrl);
			let data = await response.json();

			tempArray.push(data);
			tempArray.filter((s, i, w) => w.indexOf(s) === i);
			tempArray.sort((s, w) => s.name.localeCompare(w.name));
			setCharacterName(tempArray);
		};
		characters.map((c) => fetchNames(c));
	}, []);

	const handleWatchSingleMovieInfo = () => {
		setWatchSpecific(!watchSpecific);
	};

	const Modal = () => {
		return (
			<div className="modal" onClick={handleWatchSingleMovieInfo}>
				<div className="modal-content">
					<div className="modal-header">
						<h2>{titles}</h2>
					</div>

					<h3 className="modal-body">Characters</h3>

					<ol className="container">
						{characterName.map((names, index) => (
							<li key={index}> {names.name} </li>
						))}
					</ol>
					<div className="modal-footer">
						<button>Go back</button>
					</div>
				</div>
			</div>
		);
	};

	const defaultPage = () => {
		return (
			<div onClick={handleWatchSingleMovieInfo}>
				<h2>{titles}</h2>

				<h4>{releaseDate}</h4>
			</div>
		);
	};

	return <>{watchSpecific ? defaultPage() : Modal()}</>;
};

export default Movies;
