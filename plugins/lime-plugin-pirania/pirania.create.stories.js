/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';

import { frameDecorator } from '../../.storybook/frameDecorator';
import Home from './src/pages/home';
import Admin from './src/pages/admin';
import Create from './src/pages/create';
import Renew from './src/pages/renew';
import Governance from './src/pages/governance';
import Content from './src/pages/content';

var payday = 1;
var daysLeft = 1;
var activeVouchers = {};
var governance = {};
var goBack = function() {};
var createEpoc = function() {};
var renewDate = function() {};
var renewEpoc = function() {};

storiesOf('Containers|Pirania', module)
	.addDecorator(frameDecorator)
	.add('Home screen', () => (
					<Home
						logged={false}
						submit={false}
						handlePassword={false}
						payday={1}
						daysLeft={1}
					/>
	))
	.add('Home screen logged', () => (
					<Home
						logged={true}
						submit={false}
						handlePassword={false}
						payday={payday}
						daysLeft={daysLeft}
						{...activeVouchers}
						{...governance}
					/>
	))
	.add('Admin', () => (
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

