import React from 'react';

const Playlist = (props) => {
	const songs = props.songs;

	const loaded = () => {
		const JSX = songs.map((song) => {
			const favSong = song.fav ? (
				<span color='red'>
					<i className='fas fa-heart'></i>
				</span>
			) : (
				<>
					<i className='fas fa-heart'></i>
				</>
			);
			return (
				<div id='songs' key={song.id}>
					<div className='title-time-buttons'>
						<span id='song-title'>{song.title}</span>{' '}
						<span id='time'>{song.time}</span>
						<div className='buttons'>
							<button
								onClick={() => {
									props.deleteSong(song);
								}}>
								<i className='fas fa-trash-alt'></i>
							</button>
							<button
								onClick={() => {
									props.toggleFave(song);
								}}>
								{favSong}
							</button>
						</div>
					</div>
					<span id='artist'>{song.artist}</span>
				</div>
			);
		});

		return <div>{JSX}</div>;
	};

	return songs.length > 0 ? loaded() : <h1>Loading...</h1>;
};
export default Playlist;
