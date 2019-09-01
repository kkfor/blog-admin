import React, { Component, Fragment } from 'react'
import styles from './index.module.scss'
import { Route, Link, Switch } from 'react-router-dom'
import route from '../../router'
import Cookies from 'js-cookie'
import history from '@/config/history'

class Container extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pathname: ''
    }
  }

  componentDidMount() {
    const pathname = history.location.pathname
    this.setState({
      pathname
    })
    const token = Cookies.get('token')
    if (!token) {
      history.push('/login')
    }
  }
  render() {
    const { pathname } = this.state

    return (
      <Fragment>
        <aside className={styles.aside}>
          <ul>
            {route.map((item, index) => (
              <li key={index}>
                <div className={item.path === pathname ? styles.active : '' }><Link to={item.path}>{item.name}</Link></div>
                {this.renderChildren(item)}
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.main}>
          <Switch>
            {route.map((item, index) => this.renderChildren(item, true))}
          </Switch>
        </main>
      </Fragment>
    )
  }

  renderChildren(item, route) {
    const { pathname } = this.state

    if (item.children && item.children.length) {
      if (route) {
        const list = []
        item.children.forEach((subitem, subindex) => {
            list.push(
              <Route
                key={subindex}
                path={subitem.path}
                component={subitem.components}
              />
            )
        })
        return list
      } else {
        return (
          <ul>
            {item.children.map((subitem, subindex) => {
              if (!subitem.hide) {
                return (
                  <li key={subindex} className={subitem.path === pathname ? styles.active : '' }>
                    <Link to={subitem.path}>{subitem.name}</Link>
                  </li>
                )
              } else {
                return ''
              }
            })}
          </ul>
        )
      }
    }
  }
}

export default Container
