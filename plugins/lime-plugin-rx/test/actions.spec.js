import limePlugin from '../src/index';
import { getNodeStatus } from '../src/rxActions';
import { expect } from 'chai';

describe('Dispatch action', () => {
  it('Get node status', () => {
    let change = getNodeStatus();
    let dispatched = [];
    change((action)=> dispatched.push(action),'');
    expect(JSON.stringify(dispatched)).to.be.equal(JSON.stringify([
      { type: limePlugin.store.constants.GET_NODE_STATUS, payload: {}}
    ]));
  });
});
