import { h } from 'preact';
import style from './style';
import I18n from 'i18n-js';

export const Banner = ({ onOk, onCancel, title, description }) => (
	<div className={style.banner}>
		<h3>{title}</h3>
		<div className={style.description}>
			{description}
		</div>
		<button className={style.bannerButton} onClick={onOk}>{I18n.t('Ok')}</button>
		<button className={style.bannerButton} onClick={onCancel}>{I18n.t('Cancel')}</button>
	</div>
);
