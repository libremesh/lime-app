import { h, Component } from 'preact';

import style from './style';

import I18n from 'i18n-js';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { changeBase } from './metaActions';
import { getBase, getStations, getSelectedHost } from './metaSelectors';

class Meta extends Component {

  nextStation(e) {
    if (typeof this.state.station !== 'undefined') {
      this.props.changeBase(this.state.station);
    }
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({station: e.target.value});
  }

  render(state) {
    return (
      <div class="container" style={{paddingTop:'100px'}}>
        <form onSubmit={this.nextStation.bind(this)}>
            <div class="row">
                <div class="six columns">
                  <p>
                    <label translate='yes'>Current status</label>
                    <span  translate='yes'>Conected Host</span>: {this.props.selectedHost}<br />
                    <span  translate='yes'>Base Host</span>: {this.props.base}
                  </p>
                </div>
                <div class="six columns">
                 <p>
                    <label for="exampleRecipientInput" translate='yes'>Select new base station</label>
                    <select class="u-full-width" onChange={this.handleChange.bind(this)} >
                        <option value={this.props.selectedHost}>{this.props.selectedHost}</option>
                        {this.props.stations.map(x => (<option value={x}>{x}</option>))}
                    </select>
                  </p>
                </div>
            </div>
            
            <button class="button green block" type="submit" translate='yes'>Change</button>
            </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    stations: getStations(state),
    base: getBase(state),
    selectedHost: getSelectedHost(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeBase: bindActionCreators(changeBase,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meta);
