import { h, Component } from 'preact';

import I18n from 'i18n-js';

export class LocateMenu extends Component {
  render() {
    return (<a href={'#/locate'}>{I18n.t('Locate')}</a>);
  }
}