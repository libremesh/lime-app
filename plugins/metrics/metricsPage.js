import { h, Component } from 'preact';

import style from './style';
import I18n from 'i18n-js';
window.i18n = I18n;
import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getMetrics } from './metricsActions';

import Loading from './components/loading';

import colorScale from 'simple-color-scale';

colorScale.setConfig({
  outputStart:1,
  outputEnd:100,
  inputStart:0,
  inputEnd:30
});


class Metrics extends Component {
  componentWillMount() {
    this.props.getMetrics();
  }
  showButton(loading) {
    if (!loading) {
      return (
        <button class="button green block" type="submit" translate='yes' onClick={this.props.getMetrics}>
          Get metrics
        </button>
      );
    }
    return (
      <div>
      </div>
    );
  }

  showLoading(loading) {
    if (!loading) {
      return;
    }
    return (
      <div style={{paddingTop:'50px'}}>
        <Loading></Loading>
        <span class="text-loading">{I18n.translateWithoutI18nline(this.props.metrics.status)}</span>
      </div>
    );
  }

  isGateway(hostname, gateway) {
    return (hostname === gateway)? (
      <span><img src=""/></span>
    ) : (false);
  };
  render() {
    return (
      <div class="container" style={{paddingTop:'50px'}}>
        {this.showLoading(this.props.metrics.loading)}<br />
        <ul class="box">
          {this.props.metrics.metrics.map(station => (
            <li class={(station.loading)? 'loading': 'load'}><b>{station.hostname}</b>
                {this.isGateway(station.hostname, this.props.metrics.gateway)}
                <br/>
                {station.bandwidth} Mbps / <span translate="yes">Package loss</span> {station.loss}%<br/>                
                <div class="line" style={{width:(station.bandwidth*100/this.props.metrics.metrics[0].bandwidth).toString()+'%',backgroundColor: colorScale.getColor(station.loss)}}></div>
            </li>))}
        </ul>
        {this.showButton(this.props.metrics.loading)}<br />
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
