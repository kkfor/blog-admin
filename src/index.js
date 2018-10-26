import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './styles/index.scss'
import './styles/common.scss'
import App from './layout/App'
import Login from './views/login'
import Bpp from './layout/Bpp'
import * as serviceWorker from './serviceWorker'
import { Router, Route, Link, Switch } from 'react-router-dom'
import history from 'config/history'
ReactDOM.render(
  <Router history={history}>
    <Fragment>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
    </Fragment>
    {/* <Bpp /> */}
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
