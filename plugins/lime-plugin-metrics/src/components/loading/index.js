import { h, Component } from 'preact';

import style from './style';

class Loading extends Component {

  render() {
    return (
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    );
  }
}

export default Loading;
