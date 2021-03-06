import React from 'react';

const Favorites = ({ faveSongs, handleFave }) => {
	const favesLoaded = faveSongs.map((fave, index) => {
		return (
			<div className='songs' key={fave.id}>
				<p className='title'>Title : {fave.title}</p>
				<p className='artist'>Artist : {fave.artist}</p>
				<p className='time'>Duration : {fave.time}</p>
				<button>
					<i className='fas fa-heart' onClick={(e) => handleFave(e, fave)}></i>
				</button>
			</div>
		);
	});
	const loading = 'Add some songs to favorite section!';
	const display = faveSongs.length > 0 ? favesLoaded : loading;

	return (
		<>
			<div className='faves'>
				<h3 id='fav-title'>Favorite Song List</h3>
			</div>
			<h4 id='fav-sub'> Song Artist Time </h4>
			<h4 id='fav-songs'>{display}</h4>
		</>
	);
};

export default Favorites;
