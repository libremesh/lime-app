import { h, Component } from 'preact';
import Router from 'preact-router';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import Header from '../components/header';
import Status from '../components/status';
import Navigator from '../components/navigator';
import { plugins } from '../config';

class App extends Component {
  render({store,history}) {
    const is_connected = (meta) => {
      if (meta.sid !== 'no_user' && meta.stauts !== 'start' ) {
        return (
            <div class={style.wraper}>
              <Router history={history}>
                {plugins
                  .filter(plugin => plugin.page !== false)
                  .map(Component => (<Component.page path={Component.name.toLowerCase()} />))
                }
              </Router>
            </div>
        );
      }
      return (
            <div class={style.wraper}>
              <Router history={history}>
              </Router>
              <Status meta={meta} back={this.props.goBase} />
            </div>
      );
    };
    
    const is_base = (meta) => {
      if (meta.selectedHost !== meta.base && meta.sid !== 'no_user' && meta.stauts !== 'start') {
        return {minWidth: '100%', paddingTop:'55px'};
      }
      return {minWidth: '100%'};
    };
    

    return (
        <div style={is_base(this.props.meta)}>
          <Header />
          <Navigator hostname={this.props.meta} goHome={this.props.goBase} />
          {is_connected(this.props.meta)}
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { meta: state.meta };
};

const goBase = (hostname) => (dispatch) => {
  dispatch({
    type: 'meta/CONECTION_CHANGE_URL',
    payload: 'ws://thisnode.info/websocket/'
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    goBase : bindActionCreators(goBase, dispatch)  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);