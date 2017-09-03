import { h, Component } from 'preact';
import style from './style';

import { Navs } from '../../routes';
import { Drawer } from '../drawer';

class Header extends Component {

	toggle(){
		this.setState({ open: !this.state.open });
	}

	menuStatus(open){
		return (open)? [style.hamburger, style.isActive].join(' ') : style.hamburger;
	}

	constructor() {
		super();
		this.toggle = this.toggle.bind(this);
		this.state = { open: false };
	}

	render() {
		return (
			<header class={style.header}>
				<h1>{(this.props.hostname !== '')?this.props.hostname:'LiMe'}</h1>
				<div class={this.menuStatus(this.state.open)} onClick={this.toggle}>
					<span>toggle menu</span>
				</div>
				<Drawer status={this.state.open} toggle={this.toggle}>
					<Navs />
				</Drawer>
			</header>
		);
	}
}

export default Header;
