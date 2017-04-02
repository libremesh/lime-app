import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

import { connect } from 'preact-redux';

export default class Footer extends Component {
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
