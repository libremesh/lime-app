import { h } from 'preact';
import style from './style';

const ProgressBar = ({ color = '#38927f', progress = 0 }) => (
	<div>
		<div className={style.wrapper}>
			<div className={style.progress} style={{ backgroundColor: color, width: `${progress}%` }} />
		</div>
	</div>
);

export default ProgressBar;
