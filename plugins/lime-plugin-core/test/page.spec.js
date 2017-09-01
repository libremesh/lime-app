import { h, render } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

import I18n from 'i18n-js';

chai.use(assertJsx);

import { Meta, mapDispatchToProps, mapStateToProps } from '../src/metaPage';
import * as c from '../src/metaConstants';
import { initialState } from '../src/metaReducer';

describe('Meta page', () => {
  it.skip('Render base and selected host', () => {
    let component = <Meta
        stations={['host-01','host-base']}
        base={'host-base'}
        selectedHost={'host-01'}
        changeBase={()=>{}} />;
    expect(component).to.contain(
        <p>
            <label>Current status</label>
            <span>Conected Host</span>: host-01<br />
            <span>Base Host</span>: host-base
        </p>
    );
  });
  
  it('Update state on station selection', () => {
    let status = {
      state: {
        station: 'old'
      },
      setState: (newState)=> {
        status.state = Object.assign({},status.state,newState);
      }

    };
    let handleChange = Meta.prototype.handleChange.bind(status);
    let event = { target: { value: 'newStation'} };
    expect(handleChange(event)).to.be.equal('newStation');
  });

  it('Select other station', () => {
    let status = {
      state: {
        station: 'newStation'
      },
      props: {
        changeBase: (v)=> v
      }
    };
    let nextStation = Meta.prototype.nextStation.bind(status);
    let event = { preventDefault: ()=>{} };
    expect(nextStation(event)).to.be.equal(status.state.station);
  });

  it('Load "Selectors" as props', () => {
    let state = {
      meta: Object.assign({}, initialState, {
        base: 'hostBase',
        stations:['hostBase','zStation'],
        selectedHost: 'zStation'
      })
    };
    let selectors = mapStateToProps(state);
    expect(selectors.stations).to.deep.equal(state.meta.stations);
    expect(selectors.base).to.be.equal(state.meta.base);
    expect(selectors.selectedHost).to.be.equal(state.meta.selectedHost);
  });

  it('Load "actions"', (done) => {
    let actions = mapDispatchToProps((x)=>x);
    let a = actions.changeBase('test');
    a((x)=>{
      if (x.type === c.CONECTION_CHANGE_CURRENT_BASE) {
        done();
        expect(x.payload).to.be.equal('test');
      }
    },{});
  });

});
