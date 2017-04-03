import { h, Component } from 'preact';
import style from './style';

import { Navs } from '../../routes';
import { Drawer } from '../drawer';

class Header extends Component {
  state = { open: false };

  toggle(){
    this.setState({open:!this.state.open});
  }

  render() {
    return (
      <header class={style.header}>
        <h1>LimeApp</h1>
        <span onClick={this.toggle.bind(this)} class={style.menuIcon}>X</span>
        <Drawer status={this.state.open} toggle={this.toggle.bind(this)}>
          <Navs />
        </Drawer>
      </header>
    );
  }
}

export default Header;
