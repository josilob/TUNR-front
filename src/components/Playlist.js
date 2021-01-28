import React from 'react';

const Playlist = ({ handleFave, deleteSong, songs }) => {
	// Update favorite status of the song (AS OBJECT!)

	const loaded = () => {
		const JSX = songs.map((song) => {
			return (
				<div id='songs' key={song.id}>
					<div className='title-time-buttons'>
						<span id='song-title'>{song.title}</span>
						<span id='time'>{song.time}</span>

						<div className='buttons'>
							<button
								onClick={() => {
									deleteSong(song);
								}}>
								<i className='fas fa-trash-alt'></i>
							</button>
							<button onClick={(e) => handleFave(e, song)}>
								{<i className={song.fav ? 'fas fa-heart' : 'far fa-heart'}></i>}
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
