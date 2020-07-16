import { h } from 'preact';
import style from './style';

import I18n from 'i18n-js';
import { useAppContext } from '../../utils/app.context';

function _getDomain(url) {
	return url.split('/')[2].split(':')[0];
}

export const ConnectionFailed = () => {
	const { nodeHostname, baseNodeHostname, changeNode, apiUrl } = useAppContext();
	function goBack() {
		changeNode(baseNodeHostname);
	}

	function goGeneric() {
		changeNode('thisnode.info');
	}

	return (
		<div className={style.center}>
			<span>
				<p>{I18n.t('Connection fail', { meta_ws: _getDomain(apiUrl) })}</p>
				{ (baseNodeHostname === nodeHostname) && _getDomain(apiUrl) !== 'thisnode.info' &&
					<button class="button" onClick={goGeneric}>{I18n.t('Try thisnode.info')}</button>
				}
				{ (baseNodeHostname !== nodeHostname) &&
					<button class="button" onClick={goBack}>{I18n.t('Back to base')}</button>
				}
			</span>
		</div>
	);
};

export const Connecting = () => {
	const { apiUrl } = useAppContext();
	return (
		<div className={style.center}>
			<p>{I18n.t('Trying to connect', { meta_ws: _getDomain(apiUrl) })}</p>
		</div>
	);
};
