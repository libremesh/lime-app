import { h, Component } from 'preact';
import style from './style';

import { Navs } from '../../routes';

class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>LimeApp</h1>
        <Navs />
      </header>
    );
  }
}

export default Header;
