import { Component, h } from 'preact';

import I18n from 'i18n-js';

export class RxMenu extends Component {
  render() {
    return (<a href={'#/rx'}>{I18n.t('Status')}</a>);
  }
}