import { h } from 'preact';
import I18n from 'i18n-js';


export const CompatibilityError = ({ apiUrl }) => (
	<div className="container container-padded">
		{I18n.t('This node is not compatible with this LimeApp version')}
		<a href={apiUrl}>{I18n.t('Try navigating to directly', { url: apiUrl })}</a>
	</div>
);

export const UnexpectedError = () => (
	<div className="container container-padded">
		{I18n.t('Un unexpected error occurred, please contact the developer team')}
	</div>
);
