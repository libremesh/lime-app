import { Box } from '../../../../src/components/box';
import I18n from 'i18n-js';

const Admin = ({ submit, list, renew, elect }) => (
	<div>
		<form onSubmit={submit}>
			<Box title={I18n.t('Ultimo mes')}>
				<div class="info">
					<span>
						<b>{I18n.t('Mensuales')}: </b>
						<span>30</span>
						<b style={{ marginLeft: 30, marginRight: 10 }}>Faltan: </b>
						<span>3 dias</span>
						<br />
					</span>
					<span>
						<b>{I18n.t('De una vez')}: </b>
						<span>18</span>
						<br />
					</span>
				</div>
				<button class="button green block" onClick={list}>
					{I18n.t('Ver todos')}
				</button>
			</Box>
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
			<button class="button green block" type="submit">
				{I18n.t('Criar')}
			</button>
		</form>
		<button class="button green block" onClick={renew}>
			{I18n.t('Renovar vouchers de miembros')}
		</button>
	</div>
);

export default Admin;
