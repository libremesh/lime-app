
import limeCorePlugin from '../src/index';
import { assert } from 'chai';

import { ActionsObservable } from 'redux-observable';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';

const c = limeCorePlugin.store.constants;
import epics from '../src/rxEpics';

const epicAssert = (epic,options,compare) => {
  const actions = new Subject();
  const actions$ = new ActionsObservable(actions);
  const store = { getState: () => options.store };
  
  epic(actions$, store, options.api)
    .take(options.result.length)
    .toArray()
    .subscribe(compare);

  if (options.action.length) {
    options.action.map(act => actions.next(act));
  } else {
    actions.next(options.action);
  }
};

//TESTS
describe('Status epics', () => {
  it('Get status', (done) => {
    
    const onAction = {
      type: c.GET_NODE_STATUS,
      payload: {}
    };

    const expectedOutput = {
      type: c.GET_NODE_STATUS_SUCCESS,
      payload: {
        test: 'ok'
      }
    };

    const wsAPI = {
      call: () => Observable.of({test:'ok'})
    };

    const options = {
      action: [onAction],
      result: [expectedOutput],
      store: { meta: { sid: 123 } },
      api: { wsAPI }
    };

    epicAssert(
      epics.nodeStatus,
      options,
      (actions) => {
        assert.deepEqual(actions,[expectedOutput]);
        done();
      }
    );
  });

});