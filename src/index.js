import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './styles/common.scss'
import 'antd/dist/antd.css'
import App from './layout/App';
import Login from './views/login'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Fragment>
      <Route path="/login" component={Login} />
      <Route exact path="/" component={App} />
    </Fragment>
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
