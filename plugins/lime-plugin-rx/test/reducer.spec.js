import { expect } from 'chai';
import * as c from '../src/rxConstants';
import { initialState, reducer } from '../src/rxReducer';

const action = (type,payload) => ({type, payload});

describe('Reducer methods', () => {
  it('Initial State', () => {
    let expectedProps = [
      'loading',
      'interval',
      'data'
    ].sort();
    let actualProps = Object.keys(initialState).sort();
    expect(actualProps).to.deep.equal(expectedProps);
  });

  it('Load node status', () => {
    let result = reducer(initialState, action(c.GET_NODE_STATUS,{}));
    expect(result.loading).to.be.equal(true);
  });

  it('Load success', () => {
    let payload = {test:'ok'};
    let result = reducer(initialState, action(c.GET_NODE_STATUS_SUCCESS,payload));
    expect(result.loading).to.be.equal(false);
    expect(result.data.test).to.be.equal('ok');
  });

  it('Load error', () => {
    let payload = { test: 'fail'};
    let result = reducer(initialState, action(c.GET_NODE_STATUS_ERROR,payload));
    expect(result.loading).to.be.equal(false);
    expect(result.data.test).to.be.equal('fail');
  });
 
  it('Default return', () => {
    let result = reducer(initialState, action('ACTION_NOT_CATCHED',{}));
    expect(result).to.be.deep.equal(initialState);
  });
});