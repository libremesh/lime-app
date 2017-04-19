import { h, Component } from 'preact';

import style from './style';
import I18n from 'i18n-js';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getMetrics } from './metricsActions';

class Metrics extends Component {
  componentWillMount() {
    this.props.getMetrics();
  }
  showButton(loading) {
    if (!loading) {
      return (<button class="button green block" type="submit" translate='yes' onClick={this.props.getMetrics}>Get metrics</button>)
    }
    return (<span translate="yes">Loading metrics...</span>) ;
  }
  render() {
    return (
      <div class="container" style={{paddingTop:'100px'}}>
        <ul class="box">
          {this.props.metrics.metrics.map(station => (
            <li><b>{station.hostname}</b><br/>
                {station.bandwidth} Mbps<br/>
                <span translate="yes">Package loss</span> {station.loss}%<br/>                
                <div class="line" style={{outerWidth:(station.bandwidth*100/this.props.metrics.metrics[0].bandwidth).toString()+'%'}}></div>
            </li>))}
        </ul>
        {this.showButton(this.props.metrics.loading)}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    metrics: state.metrics
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMetrics: bindActionCreators(getMetrics,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
