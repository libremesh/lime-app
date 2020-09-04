import { h } from 'preact';

export const Box = ({ title, children }) => (
	<div style={{ marginBottom: '10px' }}>
		<div style={{ background: 'rgb(68, 146, 127)',padding: '10px',color: '#fff' }}>
			<b>{title}</b>
		</div>
		<div style={{ border: '1px solid #ccc',padding: '10px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
			{children}
		</div>
	</div>
);

