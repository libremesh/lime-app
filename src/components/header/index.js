import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux'
import { updateLocation } from '../../store/actions/ActionCreators'

import { getPathname } from '../../store/selectors/meta'

class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>LimeApp</h1>
				<nav>
					<Link href="/align">Align</Link>
					<Link href="/locate">Locate</Link>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    pathname: getPathname(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation : bindActionCreators(updateLocation, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
