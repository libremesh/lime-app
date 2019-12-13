import { h } from 'preact';
import style from './style';

import I18n from 'i18n-js';


const Status = ({ back, meta }) => {
	function goBack() {
		back(meta.base);
	}
  
	function goGeneric() {
		back('thisnode.info');
	}


	function isBase(base,current) {
		if (base !== current) {
			return (<button class="button green" onClick={goBack}>{I18n.t('Back to base')}</button>);
		}
		return;
	}

	function isError (ws, error) {
		if (typeof error !== 'undefined') {
			return (
				<span>
					<p>{I18n.t('Connection fail',{ meta_ws: meta.ws.split('/')[2] })}</p>
					<button class="button green" onClick={goGeneric}>{I18n.t('Try thisnode.info')}</button>
				</span>
			);
		}
		return (<p>{I18n.t('Trying to connect',{ meta_ws: meta.ws.split('/')[2] })}</p>);
	}

	return (
		<div class={style.center}>
			{isError(meta.ws.split('/')[2], meta.error) }
			{isBase(meta.base,meta.selectedHost)}
		</div>
	);

};

export default Status;
