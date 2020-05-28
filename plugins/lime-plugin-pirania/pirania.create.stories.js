/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import { frameDecorator } from '../../.storybook/frameDecorator';
import Home from './src/pages/home';
import { AdminPiraniaPage } from './src/pages/admin';
import { ListPiraniaPage } from './src/pages/list';
import { CreatePiraniaPage } from './src/pages/create';
import { RenewPiraniaPage } from './src/pages/renew';
import { GovernancePiraniaPage } from './src/pages/governance';
import { ContentPiraniaPage } from './src/pages/content';

var daysLeft = 1;
var activeVouchers = {};
var governance = {
    provider: {
      payday: 24,
      cost: 150,
      name: "Internet Service Provider Name",
      speed: "10Mbs"
    },
    community: {
      payday: 20,
      maintenance: 200,
      reserve: 0,
      currency: "USD"
    },
    member: {
      cost: 50,
      vouchers: 5
    }
};
const now = new Date();
var renewDate = new Date(now.getFullYear(), now.getMonth() + 1, governance.community.payday + 1);
var vouchers = [
    {
      expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
      note: 'wesley-coputador',
      name: 'delvaearidi-m-wesley-computador',
      macs: [
        '2c:6f:c9:66:4c:2'
      ],
      voucher: 'fx97sphu',
      macsAllowed: '1',
      node: 'delvaearidi',
      type: 'member'
    },
    {
      expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
      type: 'invalid',
      name: 'aridi-mnf',
      macs: [
        '2c:6f:c9:66:4c:2b'
      ],
      macsAllowed: '1',
      node: 'aridi',
      voucher: '7b7i95yn'
    },
    {
      expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
      note: 'jpcel',
      name: 'flordeouro-m-jpcel-',
      macs: [
        '2e:fc:84:93:85:45'
      ],
      voucher: 'f22slkrs',
      macsAllowed: '1',
      node: 'flordeouro',
      type: 'member'
    },
    {
      expires: new Date(now.getFullYear(), now.getMonth(), governance.community.payday + 1).valueOf(),
      note: 'yan-ttp',
      name: 'flordeouro-v-yan-ttp',
      macs: [
        'ac:f6:f7:ca:87:43'
      ],
      voucher: 'f92uzvwf',
      macsAllowed: '1',
      node: 'flordeouro',
      type: 'visitor'
    }
  ];

export const actions = {
    submit: (e) => {
        action('Submit');
        e.preventDefault();
    },
    list: action('List vouchers'),
    create: action('Create vouchers'),
    renew: action('Renew vouchers'),
    editGovernance: action('Edit governance information'),
    editContent: action('Edit captive-portal page content'),
    goBack: action('Go back'),
    removeVoucher: action('Remove voucher'),
    createVisitorVoucher: action('Create visitor voucher'),
    createMemberVoucher: action('Create member voucher'),
    renewEpoc: action('Renew voucher date'),
    writeGovernance: action('Save governance information')
};

var createEpoc = function() {};
var renewDate = function() {};
var getStatus = () => false;
var getVoucherList = () => []
var getPiraniaContent = () => []

storiesOf('Containers|Pirania', module)
    .addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Home screen', () => (
					<Home
						logged={false}
						handlePassword={false}
                        daysLeft={daysLeft}
                        provider={object('Governance provider state', governance.provider)}
                        community={object('Governance community state', governance.community)}
                        member={object('Governance member state', governance.member)}
                        submit={e => actions.submit(e)}
					/>
	))
	.add('Logged admin screen', () => (
					<AdminPiraniaPage
                        loading={boolean("Is loading enabled information", false)}
                        provider={object('Governance provider state', governance.provider)}
                        community={object('Governance community state', governance.community)}
                        member={object('Governance member state', governance.member)}
                        daysLeft={daysLeft}
                        getStatus={getStatus}
                        {...actions}
					/>
    ))
    .add('List vouchers screen', () => (
        <ListPiraniaPage
            vouchers={object('Voucher list', vouchers)}
            loading={boolean("Is loading", false)}
            {...actions}
        />
    ))
	.add('Create new voucher screen', () => (
					<CreatePiraniaPage
						daysLeft={daysLeft}
						createEpoc={createEpoc}
                        loading={boolean("Is loading", false)}
                        {...actions}
					/>
	))
	.add('Renew vouchers screen', () => (
					<RenewPiraniaPage
                        daysLeft={daysLeft}
                        renewDate={renewDate}
                        loading={boolean("Is loading", false)}
                        getVoucherList={getVoucherList}
                        {...actions}
					/>
	))
	.add('Edit governance information screen', () => (
					<GovernancePiraniaPage
                        loading={boolean("Is loading", false)}
                        provider={object('Governance provider state', governance.provider)}
                        community={object('Governance community state', governance.community)}
                        member={object('Governance member state', governance.member)}
                        {...actions}
					/>
	))
	.add('Edit content screen', () => (
					<ContentPiraniaPage
                        loading={boolean("Is loading", false)}
                        getPiraniaContent={getPiraniaContent}
                        {...actions}
					/>
	));

