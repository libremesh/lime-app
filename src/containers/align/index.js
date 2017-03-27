import { h, Component } from 'preact';
import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { changeInterface, changeStation } from '../../store/actions/ActionCreators';

import { getAll } from '../../store/selectors/align';

class Align extends Component {

  changeStation = (e)  => e;

  render(state) {
    return (
      <div class={style.align}>
        <h1>Align</h1>
        <pre>
          { JSON.stringify(state.alignData, null,'  ') }
        </pre>
        <h2>Intefaces</h2>
        <select onChange={(e)=>{ this.props.changeInterface(e.target.value); }} value={state.alignData.currentReading.iface ? state.alignData.currentReading.iface : null }>
          {state.alignData.ifaces.map((iface)=> {
            return <option value={iface.name}>{iface.name}</option>;
          })}
        </select>
        <h2>Nodes</h2>
        <select onChange={(e) => { this.props.changeStation(e.target.value); }} value={state.alignData.currentReading.mac ? state.alignData.currentReading.mac : null }>
          {state.alignData.stations.map((station)=> {
            return <option value={station.mac}>{station.hostname}</option>;
          })}
        </select>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    alignData: getAll(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeInterface : bindActionCreators(changeInterface, dispatch),
    changeStation : bindActionCreators(changeStation, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Align);
