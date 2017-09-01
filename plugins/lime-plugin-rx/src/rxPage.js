/*global I18n */
import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getNodeStatus, stopTimer, changeNode } from './rxActions';
import { getNodeData, isLoading } from './rxSelectors';

import { Box } from './components/box.js';

import I18n from 'i18n-js';

const toHHMMSS = (secs, plus) => {
  let sec_num = parseInt(secs, 10) + plus;
  let days    = Math.floor(sec_num / 86400) % 24;
  let hours   = Math.floor(sec_num / 3600) % 24;
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;
  return [days,hours,minutes,seconds]
    .map(v => v < 10 ? "0" + v : v)
    .join(":");
};

class SystemBox extends Component {
  render() {
    if (typeof this.props.node.uptime !== 'undefined') {
      this.props.update();
      return (
        <Box title={I18n.t('System')}>
          <span>
            <b>{I18n.t('Uptime')} </b>{toHHMMSS(this.props.node.uptime,this.props.count)}<br/>
          </span>
        </Box>
      );
    }
    return (<span></span>);
  }
}


export class Page extends Component {
  
  componentDidMount() {
    this.props.getNodeStatus();
  }

  componentWillUnmount() {
    this.props.stopTimer();
    this.stopCount();
  }

  loading(option, nodeData){
    if (!option) {
      return this.nodeStatus(nodeData);
    }
    return (
      <h4 style={{textAlign:'center'}} >
        {I18n.t('Loading node status...')}
      </h4>
    );
  }

  startCount() {
    if (typeof this.count === 'undefined') {
      this.setState({plusTime: 0});
      this.count = setInterval(()=>{
        let newTime = this.state.plusTime + 1;
        this.setState({plusTime: newTime});
      },1000);
    }
  }

  stopCount() {
    clearInterval(this.count);
    this.setState({plusTime:0});
    delete this.count;
  }

  nodeStatus(node){
    if (node.hostname) {
      this.startCount();
      return (
        <div>
          <Box title={I18n.t('Most Active')}>
            <span style={{float:'right',fontSize:'2.7em'}}>{node.most_active.signal}</span>
            <span style={{fontSize:'1.4em'}} onClick={()=>this.props.changeNode(node.most_active.hostname.split('_')[0])}><b>{node.most_active.hostname.split('_')[0]}</b></span><br/>
            <b>{I18n.t('Interface')} </b>{node.most_active.iface.split('-')[0]}<br/>
            <b>{I18n.t('Traffic')} </b> {Math.round((node.most_active.rx_bytes + node.most_active.tx_bytes)/1024/1024)}MB
            <div style={{clear:'both'}}></div>
          </Box>

          <SystemBox node={node} count={this.state.plusTime} update={this.startCount.bind(this)}/>

          <Box title={I18n.t('Internet connection')}>
            <span>
              <b> {(node.internet.IPv4.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} IPv4 </b>
              <b> {(node.internet.IPv6.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} IPv6 </b>
              <b> {(node.internet.DNS.working === 1)? (<span style={{color:'green'}}>✔</span>): (<span style={{color:'red'}}>✘</span>)} DNS </b>
            </span>
          </Box>
            
          <Box title={I18n.t('IP Addresses')}>
            { node.ips.map((ip,key) => (
              <span style={(key === 0)? {fontSize:'1.4em'} :{}}>
                <b>IPv{ip.version} </b> {ip.address}< br/>
              </span>)
            )}
          </Box>

        </div>
      );
    }
  }

  render() {
    return (
      <div class="container" style={{paddingTop:'80px'}}>
        { this.loading(this.props.isLoading, this.props.nodeData,this.props.signal) }
      </div>
    );
  }
}


export const mapStateToProps = (state) => {
  return {
    nodeData: getNodeData(state),
    isLoading: isLoading(state)
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
    getNodeStatus: bindActionCreators(getNodeStatus,dispatch),
    stopTimer: bindActionCreators(stopTimer,dispatch),
    changeNode: bindActionCreators(changeNode,dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);