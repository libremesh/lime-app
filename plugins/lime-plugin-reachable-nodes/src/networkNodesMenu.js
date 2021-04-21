import { h } from 'preact';

import I18n from 'i18n-js';

export const NetworkNodesMenu = () => (
	<a href={'#/networknodes'}>{I18n.t('Network Nodes')}</a>
);