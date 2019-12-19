import { h } from 'preact';
import style from './style';

export const Drawer = ({ status, toggle, children }) => {
	function statusStyle (open) {
		if (open) {
			return 'transform: translate(0,0)';
		}
		return 'transform: translate(-100vw,0)';
	}

	return (
		<div class={style.drawer} style={statusStyle(status)} onClick={toggle}>
			{(children)}
		</div>
	);
};
