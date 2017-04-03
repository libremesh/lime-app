import { h, Component } from 'preact';

import { plugins } from './config';

import { push } from 'preact-router-redux';

export class Navs extends Component {
  render() {
    const menuItems = plugins
      .filter( plugin => plugin.page !== false)
      .map( plugin => <plugin.menu />);
    return (<nav>{menuItems}</nav>);
  }
}