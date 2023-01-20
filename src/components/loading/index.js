

import style from './style.less';

export const Loading = ({ color }) => {
	const styleOverride = color ? { backgroundColor: color } : '';
	return (
		<div className={style.spinner} aria-label="loading" data-testid="loading">
			<div className={style.bounce1} style={styleOverride} />
			<div className={style.bounce2} style={styleOverride} />
			<div className={style.bounce3} style={styleOverride} />
		</div>
	)
};

export default Loading;
