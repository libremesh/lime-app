import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './style';

export const Header = ({ hostname, menuHidden, Drawer, Navs }) => {
	const [open, setState ] = useState(false);
	function toggle() {
		setState(!open);
	}

	function menuStatus(open, hide) {
		if (hide) return [style.hamburger, style.isHidden].join(' ');
		return (open)? [style.hamburger, style.isActive].join(' ') : style.hamburger;
	}

	return (
		<header class={style.header}>
			<h1>{(hostname !== '')?hostname:'LiMe'}</h1>
			<div className={menuStatus(open, menuHidden)} onClick={toggle} >
				<span>toggle menu</span>
			</div>
			<Drawer status={open} toggle={toggle}>
				<Navs />
			</Drawer>
		</header>
	);
};
