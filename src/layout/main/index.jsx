import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Switch } from 'react-router-dom'
import { route } from '../../router'
import Cookies from 'js-cookie'
import history from '@/config/history'
import Header from '../header'


class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pathname: ''
    }
  }

  componentDidMount() {
    const token = Cookies.get('token')
    if (!token) {
      history.push('/login')
    }
  }
  render() {
    return (
      <section className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Switch>
            {route.map((item, index) => (
              <Route key={index} path={item.path} component={item.components} />
            ))}
          </Switch>
        </main>
      </section>
    )
  }
}

export default Main
