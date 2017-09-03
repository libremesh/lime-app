
import { expect } from 'chai';
import * as c from '../src/metaConstants';
import { initialState, reducer } from '../src/metaReducer';

const action = (type,payload) => ({ type, payload });

describe('Reducer methods', () => {
	it('Initial State', () => {
		let expectedProps = [
			'title',
			'sid',
			'status',
			'url',
			'conection',
			'ws',
			'interval',
			'stations',
			'base',
			'home',
			'selectedHost'
		].sort();
		let actualProps = Object.keys(initialState).sort();
		expect(actualProps).to.deep.equal(expectedProps);
	});

	it('Write websocket url', () => {
		let payload = 'ws://test/websocket/';
		let result = reducer(initialState, action(c.CONECTION_START,payload));
		expect(result.conection).to.be.equal(false);
		expect(result.ws).to.be.equal(payload);
	});

	it('Rewrite websocket url and mark as disconnected', () => {
		let payload = 'ws://test/websocket/';
		let result = reducer(initialState, action(c.CONECTION_CHANGE_URL,payload));
		expect(result.conection).to.be.equal(false);
		expect(result.ws).to.be.equal(payload);
		expect(result.ws).not.to.be.equal(initialState.ws);
	});

	it('Set connection as success', () => {
		let payload = { conection: true };
		let result = reducer(initialState, action(c.CONECTION_SUCCESS,payload));
		expect(result.conection).to.be.equal(true);
		expect(result.conection).not.to.be.equal(initialState.conection);
	});

	it('Write SID at successed login', () => {
		let payload = 123;
		let result = reducer(initialState, action(c.AUTH_LOGIN_SUCCESS,payload));
		expect(result.sid).to.be.equal(payload);
	});

	it('Load hostname success - First hostname load', () => {
		let payload = { status: 'ok', hostname: 'testBase' };
		let result = reducer(initialState, action(c.CONECTION_LOAD_HOSTNAME_SUCCESS,payload));
		expect(result.base).to.be.equal(payload.hostname);
		expect(result.selectedHost).to.be.equal(payload.hostname);
	});

	it('Load hostname success - Others hostname loads', () => {
		let currentState = Object.assign({},initialState,{ base: 'initialBase', selectedHost: 'otherTestBase' });
		let payload = { status: 'ok', hostname: 'otherTestBase' };
		let result = reducer(currentState, action(c.CONECTION_LOAD_HOSTNAME_SUCCESS,payload));
		expect(result.selectedHost).to.be.equal(payload.hostname);
	});

	it('Set current base', () => {
		let payload = { status: 'ok', hostname: 'TestBase' };
		let result = reducer(initialState, action(c.CONECTION_CHANGE_CURRENT_BASE,payload));
		expect(result.base).not.to.be.equal(payload.selectedHost);
		expect(result.selectedHost).to.be.equal(payload.hostname);
	});

	it('Set neighbors, add current hostname and sort', () => {
		let currentState = Object.assign({},initialState,{ base: 'TestBase' });
		let hosts = ['00test','01test'];
		let payload = hosts;
		let result = reducer(currentState, action(c.CONECTION_LOAD_NEIGHBORS_SUCCESS,payload));
		expect(result.stations).to.be.contain('TestBase');
		expect(result.stations).to.be.deep.equal(hosts.concat('TestBase').sort());
	});
  
	it('Default return', () => {
		let result = reducer(initialState, action('ACTION_NOT_CATCHED',{}));
		expect(result).to.be.deep.equal(initialState);
	});
});