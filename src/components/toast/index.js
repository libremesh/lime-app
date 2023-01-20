
import style from './style.less';

const getStyle = (type) => {
	switch (type) {
		case "success":
			return style.success;
		case "error":
			return style.error;
		default:
			return "";
	}
}

const Toast = ({ onHide, type, text }) => (
	<div class={style.toastWrapper}>
		<div class={`${style.toast} ${getStyle(type)}`} onClick={onHide}>
			{text}
		</div>
	</div>
);

export default Toast;
