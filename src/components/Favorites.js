import React from 'react';

const Favorites = (props) => {
	const favesLoaded = props.faveSongs.map((fave, index) => {
		return (
			<>
				<div className='songs' key={fave.id}>
					<p className='title'>Title : {fave.title}</p>
					<p className='artist'>Artist : {fave.artist}</p>
					<p className='time'>Duration : {fave.time}</p>
					{/* Button that toggles favorites on click in FAV LIST */}
					<button>
						<i className='fas fa-heart'></i>
					</button>
				</div>
			</>
		);
	});
	const loading = 'Add some songs to favorite section!';
	const display = props.faveSongs.length > 0 ? favesLoaded : loading;

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
