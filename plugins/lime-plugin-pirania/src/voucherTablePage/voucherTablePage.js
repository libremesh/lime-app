import { h } from 'preact';
import I18n from 'i18n-js';

export const VoucherTablePage = ({list}) => (
	<div class={`container container-padded container-center`}>
		<h3>{I18n.t('Vouchers Lists')}</h3>
		{list.map(item => <span key={item.id}>{item.id}: {item.name}, {item.mac}</span>)}
	</div>
);