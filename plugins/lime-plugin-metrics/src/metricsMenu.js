import { h, Component } from 'preact';

import I18n from 'i18n-js';

export class MetricsMenu extends Component {
  render() {
    return (<a href={'#/metrics'}>{I18n.t('Metrics')}</a>);
  }
}