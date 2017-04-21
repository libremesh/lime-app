import { h, Component } from 'preact';
import style from './style';
import I18n from 'i18n-js';
import Loading from '../loading';
import colorScale from 'simple-color-scale';

colorScale.setConfig({
  outputStart:1,
  outputEnd:100,
  inputStart:0,
  inputEnd:30
});


class Box extends Component {
  render() {
    return (
        <div class={(this.props.station.loading)? 'box loading': 'box load'}>
            <b>{this.props.station.hostname}</b><br/>
            {this.props.station.bandwidth} Mbps / <span translate="yes">Package loss</span> {this.props.station.loss}%<br/>                
            <div class="line"
                style={{
                  width:(this.props.station.bandwidth*100/20).toString()+'%',
                  backgroundColor: colorScale.getColor(this.props.station.loss)
                }}>
            </div>
        </div>
    );
  }
}

export default Box;