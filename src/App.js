import React from 'react';
import './App.css';
import Form from './components/Form';
import Playlist from './components/Playlist';
import Favorites from './components/Favorites';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

function App() {
	const url = 'http://localhost:3000';

	const emptySong = {
		title: '',
		artist: '',
		time: '',
	};
	const [songs, setSongs] = React.useState(emptySong);
	const [favorites, setFavorites] = React.useState([]);

	//fetch songs
	const getSongs = () => {
		fetch(url + '/songs/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data.songs);
			});
	};
	//get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);

	//create songs
	const handleCreate = (newSong) => {
		fetch(url + '/songs/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};

	//delete song
	const deleteSong = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	const toggleFave = (song) => {
		const favs = [...favorites];
		const idx = favs.indexOf(song);
		favs.includes(song) ? favs.splice(idx, 1) : favs.push(song);
		setFavorites(favs);
	};
	return (
		<Router>
			<div className='App'>
				<div id='head'>
					<h1 id='tunr'>TUNR.</h1>
					<h6 id='title'>FOR ALL YOUR PLAYLIST NEEDS</h6>
				</div>
				<hr />
				<h2 id='playlist-title'>PLAYLIST 1</h2>

				<main id='mainbox'>
					<Switch>
						<Route
							exact
							path='/'
							render={(rp) => (
								<div>
									<div id='playlist-container'>
										<Playlist
											songs={songs}
											deleteSong={deleteSong}
											toggleFave={toggleFave}
										/>
									</div>

									<Favorites favorites={favorites} toggleFave={toggleFave} />
									<h2 id='add'>ADD A NEW Song</h2>
									<Form
										label='ADD NEW SONG'
										song={emptySong}
										handleSubmit={handleCreate}
									/>
								</div>
							)}
						/>
					</Switch>
				</main>
			</div>
		</Router>
	);
}
export default App;
