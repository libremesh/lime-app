/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs';
import { frameDecorator } from '../../.storybook/frameDecorator';
import Home from './src/pages/home';
import Admin from './src/pages/admin';
import Create from './src/pages/create';
import Renew from './src/pages/renew';
import Governance from './src/pages/governance';
import Content from './src/pages/content';

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

export const actions = {
	submit: action('Submit')
};

var goBack = function() {};
var createEpoc = function() {};
var renewDate = function() {};
var renewEpoc = function() {};
function setPage () {
    return false;
}

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
                        submit={action('Submit')}
					/>
	))
	.add('Logged admin screen', () => (
					<Admin
						list={() => setPage(1)}
						create={() => setPage(2)}
						renew={() => setPage(3)}
						editGovernance={() => setPage(4)}
						editContent={() => setPage(5)}
						payday={payday}
						daysLeft={daysLeft}
						{...activeVouchers}
						{...governance}
					/>
	))
	.add('Create', () => (
					<Create
						goBack={goBack}
						daysLeft={daysLeft}
						createEpoc={createEpoc}
						list={() => setPage(1)}
					/>
	))
	.add('Renew', () => (
					<Renew
						daysLeft={daysLeft}
						goBack={goBack}
						renewDate={renewDate}
						renewEpoc={renewEpoc}
					/>
	))
	.add('Governance', () => (
					<Governance
						goBack={goBack}
						{...governance}
					/>
	))
	.add('Content', () => (
					<Content
						goBack={goBack}
					/>
	))

