import { h, Component } from 'preact';

import { Router } from 'preact-router'
import {syncHistoryWithStore } from 'preact-router-redux'

import { Provider } from 'preact-redux'

import createHistory from 'history/createBrowserHistory'

import { getPathname } from './../store/selectors/meta'

import Header from '../components/header';

import Align from './align';
import Locate from './locate';


export const App = ({store}) => {
  const history = syncHistoryWithStore(createHistory(), store)
  return (
      <Provider store={store}>
        <div>
        <Header />
          <Router history={history}>
            <Align path='/align' />
            <Locate path='/locate' />
          </Router>
        </div>
      </Provider>
)};
    