import { h, Component } from 'preact'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useState, useEffect } from 'preact/hooks';

import { adminLogin } from '../../lime-plugin-admin/src/adminActions'
import { getPiraniaGovernance } from './piraniaActions'
import { governance, loading } from './piraniaSelectors'
import { authStatus } from '../../lime-plugin-admin/src/adminSelectors'
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors'

import Loading from '../../../src/components/loading'
import Home from './pages/home'

import I18n from 'i18n-js'

const style = {
  textLoading: {
    textAlign: 'center',
    display: 'block'
  },
  loadingBox: {
    position: 'fixed',
    marginTop: '30vh',
    zIndex: '5555',
    background: 'rgb(255, 255, 255)',
    width: '200px',
    top: '0px',
    left: 'calc(50% - 100px)',
    borderRadius: '11px',
    padding: '15px',
    boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
  }
}

export const Pirania = ({ authStatus, adminLogin, loading, getPiraniaGovernance, governance }) => {
  const [ password, changePassword ] = useState('')
  function handlePassword (e) {
    changePassword(e.target.value )
  }

  function login (e) {
    e.preventDefault()
    adminLogin({
      username: 'root',
      password
    })
  }

  function showLoading (show) {
    if (show) {
      return (
        <div style={style.loadingBox}>
          <Loading />
          <span style={style.textLoading}>
            {I18n.t(
              'Loading governance data.'
            )}
          </span>
        </div>
      )
    }
  }

  function changePage (p) {
    
  }

  	useEffect(() => {
      getPiraniaGovernance();
      return () => {};
    },[]);
  return (
    <div class='container' style={{ paddingTop: '100px' }}>
      {showLoading(loading)}
      {(!authStatus && governance) && (
        <Home
          logged={authStatus}
          submit={login}
          handlePassword={handlePassword}
          {...governance}
        />
      )}
    </div>
  )
}

export const mapStateToProps = state => ({
  authStatus: authStatus(state),
  loading: loading(state),
  governance: governance(state)
})

export const mapDispatchToProps = dispatch => ({
  getPiraniaGovernance: bindActionCreators(getPiraniaGovernance, dispatch),
  adminLogin: bindActionCreators(adminLogin, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Pirania)
