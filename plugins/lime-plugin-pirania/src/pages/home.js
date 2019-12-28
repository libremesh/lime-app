import { Box } from '../../../../src/components/box';

export default function HomePiraniaPage ({ logged, handlePassword, submit }) {
  return (
    <div>
      {/* <Box title={I18n.t('Users')}>
        <div class="info">
          <span>
            <b>{I18n.t('Active member vouchers')}: </b>
            <span>30</span>
            <br />
          </span>
          <span>
            <b>{I18n.t('Active visitor vouchers')}: </b>
            <span>18</span>
            <br />
          </span>
        </div>
      </Box> */}
      {/* <Box title={I18n.t('Connection')}>
        <span>
          <b>{I18n.t('Contracted internet speed')}: </b>
          <span>10Mbs</span>
          <br />
        </span>
        <span>
          <b>{I18n.t('Speed test')}: </b>
          <span>
            {' '}
            {navigator.connection ? (
              navigator.connection.downlink + 'Mbs'
            ) : (
              <i>{I18n.t('please use Chrome browser')}</i>
            )}
          </span>
          <br />
        </span>
      </Box> */}
      {/* <Box title={I18n.t('Governance')}>
        <span
          style={{
            display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h5>{I18n.t('Payday')}: 24/10/2019</h5>
          <div style={{ height: 35 }}>
            <span>5 </span>
            <span>{I18n.t('days left')} </span>
          </div>
          <br />
        </span> */}
        {/* <span>
          <b>{I18n.t('Node admins')}: </b>
          <span>Juca Urubu</span>, <span>Vó Naquinha</span>
          <br />
        </span> */}
        {/* <span>
          <b>{I18n.t('Payment admins')}: </b>
          <span>Joana Pé Sujo</span>, <span>Juca do Leite</span>
        </span>
        <br /> */}
        {/* <span>
          <b>{I18n.t('Value per person')}: </b>
          <span>$35,00</span>
          <br />
        </span>
        <span>
          <b>{I18n.t('Amount in reserve')}: </b>
          <span>$351,50</span>
          <br />
        </span>
      </Box>
      <hr /> */}
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
