import { h } from 'preact';

export const Box = ({ title, children }) => (
	<div style={{ marginBottom: '10px' }}>
		<div style={{ background: '#90d504',padding: '10px',color: '#fff' }}>
			<b>{title}</b>
		</div>
		<div style={{ border: '1px solid #ccc',padding: '10px' }}>
			{children}
		</div>
	</div>
);

