import { h, Component } from 'preact';

import I18n from 'i18n-js';

export class Menu extends Component {
  render() {
    return (<a href={'#/notes'}>{I18n.t('Notes')}</a>);
  }
}