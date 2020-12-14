import { h } from 'preact';
import style from './style.less';

const Tabs = ({tabs, current, onChange}) => (
	<div class={style.tabs} role="tablist">
		{tabs.map(tab =>
			<div class={style.tabWrapper}>
				<div role="tab" class={`${style.tab} ${current === tab.key ? style.tabActive : ''}`}
					onClick={() => onChange(tab.key)}
				>
					{tab.repr}
				</div>
				<span class={style.separator} />
			</div>
		)}
	</div>
);

export default Tabs;
