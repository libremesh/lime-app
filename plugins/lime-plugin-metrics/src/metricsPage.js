import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getMetrics, getMetricsAll, getMetricsGateway, changeNode } from './metricsActions';

import Loading from './components/loading';
import Box from './components/box';

import I18n from 'i18n-js';

import colorScale from 'simple-color-scale';

colorScale.setConfig({
  outputStart:1,
  outputEnd:100,
  inputStart:0,
  inputEnd:30
});

const style = {
  textLoading: {
    textAlign: 'center',
    display: 'block'
  },
  textError: {
    textAlign: 'center',
    display: 'block',
    background: '#d55206',
    color: '#fff',
    padding: '5px',
    borderRadius: '4px',
    fontWeight: 'bold'
  },
  box: {
    margin: '3px',
    padding: '10px',
    fontSize: '1.4em',
    background: '#f5f5f5',
    textAalign: 'center',
    overflow: 'hidden',
    height: 'auto'
  },
  loadingBox: {
    position: 'fixed',
    marginTop: '30vh',
    zIndex: '5555',
    background: 'rgb(255, 255, 255)',
    width: '200px',
    top: '0px',
    left: 'calc(50% - 100px)',
    borderRadius: '11px',
    padding: '15px',
    boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
  }
};

class Metrics extends Component {
  componentWillMount() {
    this.props.getMetrics();
  }
  showButton(loading) {
    if (!loading) {
      return (
        <div class="row">
          <br/>
          <button class="button green block u-full-width" type="submit" onClick={()=>this.props.getMetricsGateway(this.props.metrics.gateway)}>
            {I18n.t('Only gateway')}
          </button>
          <button class="button green block u-full-width"  type="submit" onClick={this.props.getMetricsAll}>
            {I18n.t('Full path metrics')}
          </button>
        </div>
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
      <div style={style.loadingBox}>
        <Loading></Loading>
        <span style={style.textLoading}>{I18n.translateWithoutI18nline(this.props.metrics.status)}</span>
      </div>
    );
  }

  showError(error){
    if (error !== null) {
      return (<p style={style.textError}>Error: {error.msg}</p>);
    }
    return;
  }

  isGateway(hostname, gateway) {
    return (hostname === gateway)? true : false;
  }
  
  render() {
    return (
      <div class="container" style={{paddingTop:'80px', textAlign:'center'}}>
        {this.props.metrics.error.map(x => this.showError(x))}
          <div style={style.box}>{I18n.t('From')+' '+this.props.meta.selectedHost}</div>
          {this.props.metrics.metrics.map(station => (
            <Box station={station} click={()=>this.props.changeNode(station.hostname.split('_')[0])} gateway={this.isGateway(station.hostname,this.props.metrics.gateway)}/>
            ))}
          <div style={style.box}>{I18n.t('To Internet')}</div>
        {this.showLoading(this.props.metrics.loading)}
        {this.showButton(this.props.metrics.loading)}<br />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    metrics: state.metrics,
    meta: state.meta
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMetrics: bindActionCreators(getMetrics,dispatch),
    getMetricsGateway: bindActionCreators(getMetricsGateway,dispatch),
    getMetricsAll: bindActionCreators(getMetricsAll,dispatch),
    changeNode: bindActionCreators(changeNode,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Metrics);
