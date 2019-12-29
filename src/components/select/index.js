import { h } from 'preact';
import './style.less';

export const Select = ({ text, onChange }) => (
	<div style={{ display: 'flex', flexFlow: 'row nowrap'}}>
		<input
			type="checkbox"
			name={text}
			class="css-checkbox"
			onChange={onChange}
		/>
		<label for="checkboxG4" class="css-label" style={{ marginLeft: 15 }}>{text}</label>
	</div>
);

