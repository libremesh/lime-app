import { h } from 'preact';
import style from './style';
import I18n from 'i18n-js';

export const Banner = ({ onOk, onCancel, title, description, onNotShowAgain }) => (
	<div className={style.banner}>
		<h3>{title}</h3>
		<div className={style.description}>
			{description}
		</div>
		<div>
			<button className={style.bannerButton} onClick={onOk}>{I18n.t('Ok')}</button>
			<button className={style.bannerButton} onClick={onCancel}>{I18n.t('Cancel')}</button>
		</div>
		<div class={style.dontShowAgain}>
			<label>
				<input type="checkbox" name="not-show-again" onInput={onNotShowAgain} />
				{I18n.t("Don't show this message again")}
			</label>
		</div>
	</div>
);
