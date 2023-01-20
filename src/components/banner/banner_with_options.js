import style from './style.less';
import { Trans } from '@lingui/macro';

export const BannerWithOptions = ({ title, cancelOption, onNotShowAgain, options }) => (
	<div className={style.banner}>
		<h3>{title}</h3>
		{
			options.map((option, i) => {
				return (
					<div key={i}>
						{option}
					</div>
				)
			})
		}
		{
			cancelOption
		}
		<div class={style.dontShowAgain}>
			<label>
				<input type="checkbox" name="not-show-again" onInput={onNotShowAgain} />
				<Trans>Don't show this message again</Trans>
			</label>
		</div>
	</div>
);
