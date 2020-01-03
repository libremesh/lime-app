import { Box } from '../../../../src/components/box';
import I18n from 'i18n-js';

const Admin = ({ visitors, members, list, create, renew, download, daysLeft }) => (
	<div>
		<Box title={I18n.t('Current month')}>
			<div class="info">
				<span>
					<b>{I18n.t('Members')}: </b>
					<span>{members}</span>
					<b style={{ marginLeft: 30, marginRight: 10 }}>
						<span>{daysLeft} </span>
						<span>{I18n.t('days left')} </span>
					</b>
					<br />
				</span>
				<span>
					<b>{I18n.t('Visitors')}: </b>
					<span>{visitors}</span>
					<br />
				</span>
			</div>
			<button class="button green block" onClick={list}>
				{I18n.t('Show all vouchers')}
			</button>
		</Box>
		{/* <Box title={I18n.t('Last month')}>
			<div class="info">
				<span>
					<b>{I18n.t('Members')}: </b>
					<span>30</span>
					<br />
				</span>
				<span>
					<b>{I18n.t('Visitors')}: </b>
					<span>18</span>
					<br />
				</span>
			</div>
			<button class="button green block" onClick={download}>
				{I18n.t('Download CSV')}
			</button>
		</Box> */}
		{/* WIP: Node election */}
		{/* <Box title={I18n.t('Admins elegidos')}>
			<div class="info">
				<span>
					<b>Nodo-1, Nodo-2</b>
				</span>
				<br />
			</div>
			<button
				style={{ marginTop: 15 }}
								class="button green block"
				onClick={elect}
			>
				{I18n.t('Elegir')}
			</button>
		</Box> */}
		<button class="button green block button-one" onClick={create}>
			{I18n.t('Create')}
		</button>
		<button class="button green block" onClick={renew}>
			{I18n.t('Renew member vouchers')}
		</button>
	</div>
);

export default Admin;
