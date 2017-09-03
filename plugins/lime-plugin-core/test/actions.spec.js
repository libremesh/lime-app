import limeCorePlugin from '../src/index';
import { changeBase } from '../src/metaActions';
import { expect } from 'chai';

describe('Dispatch action', () => {
	it('On change url', () => {
		let change = changeBase('test');
		let dispatched = [];
		change((action) => dispatched.push(action),'');
		expect(JSON.stringify(dispatched)).to.be.equal(JSON.stringify([
			{ type: limeCorePlugin.store.constants.CONECTION_CHANGE_URL,
				payload: 'ws://test/websocket/' },
			{ type: limeCorePlugin.store.constants.CONECTION_CHANGE_CURRENT_BASE,
				payload: 'test' }
		]));
	});
});
