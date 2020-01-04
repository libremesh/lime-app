import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';
import I18n from 'i18n-js';

export const Input = ({ type, label, value, onChange, width, onClick, accept }) => {
	const isSubmit = type === 'submit'
	if (type === 'textarea') {
		return (
			<div style={{
				width
			}}>
				{label && <label>{I18n.t(label)}</label>}
				<textarea style={{ width }} rows="3" cols="50" value={value} onChange={onChange} />
			</div>
		)
	} else {
		return (
			<div style={{
				width
			}}>
				{(!isSubmit && label) && <label>{I18n.t(label)}</label>}
					<input
						accept={accept}
						style={{ width: isSubmit ? 'inherit' : '100%' }}
						type={type || 'text'}
						value={isSubmit ? label : value}
						onChange={onChange}
						onClick={onClick}
					/>
			</div>
		);
	}
}
