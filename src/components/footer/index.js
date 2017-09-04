import { h } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export const Footer = () => (
	<header class={style.header}>
		<h1>LimeApp</h1>
		<nav>
			<Link href="/align">Align</Link>
			<Link href="/locate">Locate</Link>
		</nav>
	</header>
);