import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';
import I18n from 'i18n-js';

export const Input = ({ type, label, value, onChange, width, onClick }) => {
	const isSubmit = type === 'submit'
	return (
		<div style={{
			width: width
		}}>
			{!isSubmit && <label>{I18n.t(label)}</label>}
				<input
					style={{ width: isSubmit ? 'inherit' : '100%' }}
					type={type || 'text'}
					value={isSubmit ? label : value}
					onChange={onChange}
					onClick={onClick}
				/>
		</div>
	);
}
