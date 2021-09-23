import { h } from 'preact';

import { plugins } from '../../config';
import { useState } from 'preact/hooks';
import style from './style.less';

export const Menu = ({ opened, toggle }) => {
	const [currentView, setCurrentView] = useState('node');
	const hasCommunityPlugins = () =>
		plugins.filter(p => p.menuView && p.menuView === 'community').length > 0;
	function changeCurrentView(e) {
		e.preventDefault();
		setCurrentView(currentView === 'node' ? 'community' : 'node');
	}

	return (
		<div className={`${style.menu} ${opened ? style.menuOpened : style.menuClosed} d-flex flex-column`}>
			<nav class={style.menuItemsWrapper} onClick={toggle}>
				{plugins
					.map(plugin => ({ ...plugin, menuView: plugin.menuView || 'node' }))
					.filter(plugin => plugin.page && plugin.menu && plugin.menuView === currentView)
					.map(plugin => plugin.menu)
					.map((Component, index) =>
						<Component key={index} />)
				}
			</nav>
			{hasCommunityPlugins() && <nav class={style.viewSwitchWrapper}>
				<a href="#0" class={style.viewSwitch} onClick={changeCurrentView}>
					{currentView === 'node' &&
						I18n.t('Go to Community View')
					}
					{currentView === 'community' &&
						I18n.t('Go to Node View')
					}
				</a>
			</nav>}
		</div>
	);
}
