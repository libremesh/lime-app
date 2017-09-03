import { h } from 'preact';

import style from './style';

export const Loading = () => (
	<div className={style.spinner}>
		<div className={style.bounce1} />
		<div className={style.bounce2} />
		<div className={style.bounce3} />
	</div>
);

export default Loading;
