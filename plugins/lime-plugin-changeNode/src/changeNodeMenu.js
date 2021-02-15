import { h } from 'preact';

import I18n from 'i18n-js';

export const ChangeNodeMenu = () => (
	<a href={'#/changenode'}>{I18n.t("Visit a neighboring node")}</a>
);
