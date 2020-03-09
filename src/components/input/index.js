import { h } from 'preact';

export const Input = ({ type, label, value, onChange, width, onClick, accept }) => {
	const isSubmit = type === 'submit';
	if (type === 'textarea') {
		return (
			<div style={{
				width
			}}
			>
				{label && <label>{label}</label>}
				<textarea style={{ width }} rows="3" cols="50" value={value} onChange={onChange} />
			</div>
		);
	}
	return (
		<div style={{
			width
		}}
		>
			{(!isSubmit && label) && <label>{label}</label>}
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
};
