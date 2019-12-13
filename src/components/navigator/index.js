import { h } from 'preact';
import style from './style';


const Navigator = ({ hostname, goHome }) => {

	function notInBase(meta) {
		if (meta.selectedHost !== meta.base && meta.sid !== '00000000000000000000000000000000' && meta.stauts !== 'start') {
			return 'transform: translate(0,0)';
		}
		return 'transform: translate(0,-100px)';
	}

	return (
		<div class={style.navigation} style={notInBase(hostname)}>
			<h4>{hostname.selectedHost}</h4>
			<button onClick={goHome} >X</button>
		</div>
	);
};

export default Navigator;
