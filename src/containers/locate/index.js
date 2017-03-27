import { h, Component } from 'preact';
import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';
import { loadLocation, changeLocation } from '../../store/actions/ActionCreators';

import { getLocation } from '../../store/selectors/locate';

class Locate extends Component {

  render({ user }, { time, count }) {


    return (
      <div class={style.locate}>
        <h1>Location</h1>
        <pre>
          { JSON.stringify(this.props.station, null,'  ') }
        </pre>
        <button onClick={this.props.loadLocation}>Load</button>
        <button onClick={()=>this.props.changeLocation({lat:-53, lon:65})}>Change</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    station: getLocation(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLocation: bindActionCreators(loadLocation, dispatch),
    changeLocation : bindActionCreators(changeLocation, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Locate);
