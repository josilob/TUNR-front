import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import Playlist from './components/Playlist';
import Favorites from './components/Favorites';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

function App() {
	const url = 'https://rails-api-boj.herokuapp.com';

	const emptySong = {
		title: '',
		artist: '',
		time: '',
		fav: false,
	};
	const [songs, setSongs] = useState([]);

	//FETCH SONGS
	const getSongs = async () => {
		try {
			const res = await fetch(url + '/songs/');
			const data = await res.json();
			setSongs(data.songs);
		} catch (err) {
			console.log(err);
		}
	};
	//SHOW SONGS ON PAGE LOAD
	useEffect(() => {
		getSongs();
	}, []);

	//  FILTER FAVORITED SONGS
	const faveSongs = songs.filter((song) => song.fav);
	// console.log(faveSongs);

	// ####### HTTP REQUESTS ####### //

	//CREATE SONGS
	const handleCreate = async (newSong) => {
		try {
			await fetch(url + '/songs/', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newSong),
			});
			getSongs();
		} catch (err) {
			console.log(err);
		}
	};

	//DELETE SONGS
	const deleteSong = (song) => {
		fetch(url + '/songs/' + song.id, {
			method: 'delete',
		}).then((response) => getSongs());
	};

	//UPDATE SONG
	const updateSong = async (song) => {
		try {
			await fetch(`${url}/songs/${song.id}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(song),
			});
			getSongs();
		} catch (err) {
			console.log(err);
		} finally {
			console.log('Updated song version:', song);
		}
	};

	const handleFave = (e, song) => {
		e.preventDefault();
		const updatedSong = { ...song, fav: !song.fav };
		updateSong(updatedSong);
	};

	return (
		<Router>
			<div className='App'>
				<div id='head'>
					<h1 id='tunr'>TUNR.</h1>
					<h6 id='title'>FOR ALL YOUR PLAYLIST NEEDS</h6>
				</div>
				<hr />
				<h2 id='playlist-title'>PLAYLIST</h2>

				<main id='mainbox'>
					<Switch>
						<Route exact path='/'>
							<div>
								<div id='playlist-container'>
									<Playlist
										songs={songs}
										deleteSong={deleteSong}
										handleFave={handleFave}
									/>
								</div>

								<Favorites faveSongs={faveSongs} handleFave={handleFave} />
								<h2 id='add'>ADD A NEW Song</h2>
								<Form
									label='ADD NEW SONG'
									song={emptySong}
									handleSubmit={handleCreate}
								/>
							</div>
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}
export default App;
