import { h, Component } from 'preact';

import I18n from 'i18n-js';

export class AlignMenu extends Component {
  render() {
    return (<a href={'#/align'}>{I18n.t('Align')}</a>);
  }
}