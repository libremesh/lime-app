import { Box } from '../../../../src/components/box';
import I18n from 'i18n-js';

export default function HomePiraniaPage({ members, visitors, logged, handlePassword, submit, provider, community, member, payday, daysLeft }) {

	return (
		<div>
			<Box title={I18n.t('Users')}>
				<div class="info">
					<span>
						<b>{I18n.t('Value per person')}: </b>
						<span>{community.currency} {member.cost}</span>
						<br />
					</span>
					<span>
						<b>{I18n.t('Active member vouchers')}: </b>
						<span>{members}</span>
						<br />
					</span>
					<span>
						<b>{I18n.t('Active visitor vouchers')}: </b>
						<span>{visitors}</span>
						<br />
					</span>
				</div>
			</Box>
			<Box title={I18n.t('Connection')}>
				<span>
					<b>{I18n.t('Contracted internet speed')}: </b>
					<span>{provider.speed}</span>
					<br />
				</span>
				<span>
					<b>{I18n.t('Speed test')}: </b>
					<span>
						{' '}
						{navigator.connection
							? navigator.connection.downlink + 'Mbs'
							: <i>{I18n.t('Speed test not supported in this browser')}</i>
						}
					</span>
					<br />
					<span>
						<b>{I18n.t('Provider cost')}: </b>
						<span>{community.currency} {provider.cost}</span>
						<br />
					</span>
				</span>
			</Box>
			<Box title={I18n.t('Community')}>
				<span
					style={{
						display: 'flex',
						flexFlow: 'row nowrap',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<h5>{I18n.t('Next payday')}: {payday}</h5>
					<div style={{ height: 35 }}>
						<span>{daysLeft} </span>
						<span>{I18n.t('days left')} </span>
					</div>
					<br />
				</span>
				<span>
					<b>{I18n.t('Maintenance cost')}: </b>
					<span>{community.currency} {community.maintenance}</span>
					<br />
				</span>
				<span>
					<b>{I18n.t('Amount in reserve')}: </b>
					<span>{community.currency} {community.reserve}</span>
					<br />
				</span>
			</Box>
			<hr />
			<form onSubmit={submit} style={{ display: !logged ? 'block' : 'none' }}>
				<p>
					<label>{I18n.t('Admin password')}</label>
					<input type="password" onChange={handlePassword} class="u-full-width" />
				</p>
				<button class="button green block" type="submit">
					{I18n.t('Login')}
				</button>
			</form>
		</div>
	);
}
