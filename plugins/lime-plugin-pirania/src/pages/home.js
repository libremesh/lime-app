import { Box } from '../../../../src/components/box';

export default function HomePiraniaPage ({ logged, handlePassword, submit, provider, community, member }) {
  const now = new Date()
  const date = now.getDate()
  const hasPassed = date > community.payday
  const nextPayday = hasPassed ? new Date(now.getFullYear(), now.getMonth()+1, community.payday) : now
  const month = nextPayday.getMonth() + 1
  const year = nextPayday.getFullYear()
  const daysLeft = Math.floor((Date.UTC(nextPayday.getFullYear(), nextPayday.getMonth(), nextPayday.getDate()) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) ) /(1000 * 60 * 60 * 24))
  const payday = community.payday === date ? 'Today' : `${community.payday}/${month}/${year}`
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
            <span>30</span>
            <br />
          </span>
          <span>
            <b>{I18n.t('Active visitor vouchers')}: </b>
            <span>18</span>
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
            {navigator.connection ? (
              navigator.connection.downlink + 'Mbs'
            ) : (
              <i>{I18n.t('please use Chrome browser')}</i>
            )}
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
