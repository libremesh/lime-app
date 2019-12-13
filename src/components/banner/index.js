import { h } from 'preact';
import { connect } from 'react-redux';
import style from './style';
import I18n from 'i18n-js';
import { bindActionCreators } from 'redux';

const Banner = ({ send, banner }) => {

	function onOk(){
		send(banner.onOk);
	}

	function onCancel(){
		send(banner.onCancel);
	}

	return (banner !== false)? (
		<div className={style.banner} style={{
			padding: '20px 10px',
			position: 'fixed',
			top: '56px',
			height: '100%',
			width: '100%',
			background: '#54716a',
			color: '#fff',
			fontWeight: 'bold',
			zIndex: 999,
			textAlign: 'center'
		}}
		>
			<h3>{banner.title}</h3>
			{banner.description? <p style={{ maxWidth: '400px', margin: '20px auto' }}>{banner.description}</p>: false}
			<button onClick={onOk}>{I18n.t('Ok')}</button>
			<button onClick={onCancel}>{I18n.t('Cancel')}</button>
		</div>
	): false;
};

export default connect(
	(state) => ({
		banner: state.meta.banner || false
	}),
	(dispatch) => ({
		send: bindActionCreators((type) => ({ type }), dispatch)
	})
)(Banner);
