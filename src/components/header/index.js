import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';
import { useAppContext } from '../../utils/app.context';
import style from './style';

export const Header = ({ Menu }) => {
	const { nodeHostname, menuEnabled } = useAppContext();
	const [ menuOpened, setMenuOpened ] = useState(false);
	
	function toggleMenu() {
		setMenuOpened(prevValue => !prevValue);
	}

	return (
		<Fragment>
			<header class={style.header}>
				<h1>{nodeHostname || 'LiMe'}</h1>
				{menuEnabled &&
				<div className={`${style.hamburger} ${menuOpened ? style.isActive : ''}`}
					onClick={toggleMenu}
				>
					<span>toogle menu</span>
				</div>
				}
			</header>
			<Menu opened={menuOpened} toggle={toggleMenu} />
		</Fragment>
		
	);
};
