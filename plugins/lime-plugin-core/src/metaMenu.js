import { Component, h } from 'preact';

import I18n from 'i18n-js';

export class MetaMenu extends Component {
  render() {
    return (<a href={'#/config'}>{I18n.t('Config')}</a>);
  }
}