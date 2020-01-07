
import limeCorePlugin from '../src/index';
import { assert } from 'chai';

import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';

const c = limeCorePlugin.store.constants;
const epics = limeCorePlugin.store.epics;

//Epic test util
const epicAssert = (epic,options,compare,done) => epic(ActionsObservable.of(options.action),options.store, options.api)
	.toArray()
	.subscribe(actualOutputActions => {
		compare(actualOutputActions, options.result);
		done();
	});


//TESTS

describe('Connections epics', () => {
	it('On connection start send Settings', (done) => {
		let onAction = {
			type: c.CONECTION_START,
			payload: 'fakeHostname'
		};
		let expectedOutput = {
			type: c.CONECTION_SETTINGS,
			payload: {
				conection: false,
				ws: 'fakeHostname'
			}
		};
		let options = {
			action: onAction,
			result: [expectedOutput],
			store: null,
			api: {}
		};

		epicAssert(
			epics.conectionOff,
			options,
			assert.deepEqual,
			done
		);
	});


	it('On connection start try connect websocket', (done) => {
		let onAction = {
			type: c.CONECTION_START,
			payload: 'fakeHostname'
		};
		let expectedOutput = {
			type: c.CONECTION_SUCCESS,
			payload: {
				conection: true
			}
		};
		let wsAPI = {
			conect: () => Observable.of({})
		};
		let options = {
			action: onAction,
			result: [expectedOutput],
			store: null,
			api: { wsAPI }
		};

		epicAssert(
			epics.conectionAction,
			options,
			assert.deepEqual,
			done
		);
	});


	it('Change url', (done) => {
		let onAction = {
			type: c.CONECTION_CHANGE_URL,
			payload: 'newFakeHostname'
		};
		let expectedOutput = {
			type: c.CONECTION_SUCCESS,
			payload: {
				conection: true
			}
		};
		let wsAPI = {
			_wss: {
				url: 'fackeHostname'
			},
			call: () => Observable.of({})
		};
		let options = {
			action: onAction,
			result: [expectedOutput],
			store: null,
			api: { wsAPI }
		};

		epicAssert(
			epics.changeUrlAction,
			options,
			assert.deepEqual,
			done
		);
	});

	it('Load host name', (done) => {
		let hostname = 'fakeHostname';
		let action = {
			type: c.AUTH_LOGIN_SUCCESS
		};
		let result = [{
			type: c.CONECTION_LOAD_HOSTNAME_SUCCESS,
			payload: {
				hostname
			}
		}];
		let api = {
			wsAPI: {
				call: (sid,patch,opt) => Observable.of({ hostname })
			}
		};
		let store = {
			getState: () => ({
				meta: { sid: '123' }
			})
		};
  
		epicAssert(
			epics.loadHostname,
			{
				action,
				result,
				store,
				api
			},
			assert.deepEqual,
			done
		);
	});

	it('Load network', (done) => {
		let action = {
			type: c.CONECTION_LOAD_HOSTNAME_SUCCESS
		};
		let result = [{
			type: c.CONECTION_LOAD_NEIGHBORS_SUCCESS,
			payload: ['test1','test2','test3']
		}];
		let api = {
			wsAPI: {
				call: () => Observable.of({ nodes: { 0: 'test1',1: 'test2',2: 'test3' } })
			}
		};
		let store = {
			getState: () => ({
				meta: { sid: '123' }
			})
		};
  
		epicAssert(
			epics.loadNetwork,
			{
				action,
				result,
				store,
				api
			},
			assert.deepEqual,
			done
		);
	});

	it('Login on connection', (done) => {
		let action = {
			type: c.CONECTION_SUCCESS
		};
		let result = [{
			type: c.AUTH_LOGIN,
			payload: { user: 'admin', password: 'admin' }
		}];
    
		epicAssert(
			epics.defaultLoginAction,
			{
				action,
				result,
				store: null,
				api: null
			},
			assert.deepEqual,
			done
		);
	});

	it('Perform login', (done) => {
		let action = {
			type: c.AUTH_LOGIN,
			payload: { user: 'admin', password: 'admin' }
		};
		let result = [{
			type: c.AUTH_LOGIN_SUCCESS,
			payload: 123
		}];
		let api = {
			wsAPI: {
				call: () => Observable.of({ token: 321,success: 123 })
			}
		};
		epicAssert(
			epics.loginAction,
			{
				action,
				result,
				store: null,
				api
			},
			assert.deepEqual,
			done
		);
	});

	it('Reconnect on connection', (done) => {
		let customPage = 'customHomeRoute';
		let action = {
			type: c.CONECTION_SUCCESS
		};
		let result = [{
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				args: [ customPage ],
				method: 'push'
			}
		}];
		let store = {
			getState: () => ({
				meta: { sid: '123', home: customPage }
			})
		};
  
		epicAssert(
			epics.redirectOnConnection,
			{
				action,
				result,
				store,
				api: null
			},
			assert.deepEqual,
			done
		);
	});

});