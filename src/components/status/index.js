import { h, Component } from 'preact';
import style from './style';

import I18n from 'i18n-js';

class Status extends Component {
  goBack () {
    this.props.back(this.props.meta.base);
  }
  render() {
    let is_base = (base,current) => {
      if (base !== current) {
        return (<button class="button green" onClick={this.goBack.bind(this)} translate="yes">Back to base</button>);
      }
      return;
    };
    return (
        <div class={style.center}>
            <p translate="yes">Trying to connect {this.props.meta.ws}</p>
            {is_base(this.props.meta.base,this.props.meta.selectedHost)}
        </div>
    );
  }
}

export default Status;
