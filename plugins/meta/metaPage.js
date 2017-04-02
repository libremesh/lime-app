import { h, Component } from 'preact';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { changeBase } from './metaActions';
import { getBase, getStations, getSelectedHost } from './metaSelectors';

class Meta extends Component {

  nextStation = (e) => {
    if (typeof this.state.station !== 'undefined') {
      this.props.changeBase(this.state.station);
    }
    e.preventDefault();
  }

  handleChange = (e) => {
    this.setState({station: e.target.value});
  }

  render(state) {
    return (
      <div class="container" style={{paddingTop:'100px'}}>
        <form onSubmit={this.nextStation}>
            <div class="row">
                <div class="six columns">
                  <p>
                    <label>Current status</label>
                    Conected Host: {this.props.selectedHost}<br />
                    Base Host: {this.props.base}
                  </p>
                </div>
                <div class="six columns">
                  <p>
                    <label for="exampleRecipientInput">Select new base station</label>
                    <select class="u-full-width" onChange={this.handleChange} >
                        <option value={this.props.selectedHost}>{this.props.selectedHost}</option>
                        {this.props.stations.map(x => (<option value={x}>{x}</option>))}
                    </select>
                  </p>
                </div>
            </div>
            
            <input class="button green block" type="submit" value="Change" />
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
