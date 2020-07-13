import { h } from 'preact';
import style from './style';
import { useAppContext } from '../../utils/app.context';

const getStyle = (status) => status? {}: { bottom: '-50px', opacity: '0' };

const Alert = ({ hide, text }) => (
	<div style={getStyle(text)} class={style.toast} onClick={hide}>
		<div style={{ padding: '10px',color: '#fff' }}>
			{text}
		</div>
	</div>
);

const AlertHoc = ({}) => {
	const { alertText, hideAlert } = useAppContext();
	return <Alert text={alertText} hide={hideAlert} />;
};

export default AlertHoc;
