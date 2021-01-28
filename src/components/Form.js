import React from 'react';

const Form = (props) => {
	const [formData, setFormData] = React.useState(props.song);

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleSubmit(formData);
		setFormData(props.song);
	};

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	return (
		<form className='songForm' onSubmit={handleSubmit}>
			<input
				className='input-field'
				placeholder='TITLE'
				type='text'
				name='title'
				value={formData.title}
				onChange={handleChange}
			/>
			<br />
			<input
				placeholder='ARTIST'
				className='input-field'
				type='text'
				name='artist'
				value={formData.artist}
				onChange={handleChange}
			/>
			<br />
			<input
				placeholder='TIME'
				className='input-field'
				type='text'
				name='time'
				value={formData.time}
				onChange={handleChange}
			/>
			<br />
			<input id='submit-btn' type='submit' value={props.label} />
		</form>
	);
};

export default Form;
