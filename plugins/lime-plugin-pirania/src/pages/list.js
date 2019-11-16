import { h, Component } from 'preact';
import style from '../style';
import I18n from 'i18n-js';

const List = ({ goBack }) => (
	<div>
		<div>
			<h2>Codigos</h2>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
			<p>
				<span>11/09/2020</span>
				<span style={{ paddingLeft: 50 }}>q8kl4x</span>
			</p>
		</div>
		<button class="button green block" onClick={goBack}>
			{I18n.t('Volver')}
		</button>
	</div>
);
export default List;