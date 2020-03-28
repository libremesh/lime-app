import { h } from 'preact';
import './style';

export const Select = ({ text, onChange, checked, value }) => (
	<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
		<input
			type="checkbox"
			name={text}
			value={value || text}
			className="css-checkbox"
			onChange={onChange}
			checked={checked}
		/>
		<label for="checkboxG4" class="css-label" style={{ marginLeft: 15 }}>{text}</label>
	</div>
);

