import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Link, Switch } from 'react-router-dom'
import { route, menu } from '../../router'
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
    const token = Cookies.get('token')
    if (!token) {
      history.push('/login')
    }
  }
  render() {
    const pathname = history.location.pathname

    return (
      <div className={styles.container}>
        <aside className={styles.aside}>
          <ul>
            {menu.map((item, index) => (
              <li
                key={index}
                className={item.path === pathname ? styles.active : ''}
              >
                <div>
                  <Link
                    to={item.path}
                    className={item.path === pathname ? styles.active : ''}
                  >
                    {item.name}
                  </Link>
                </div>
                {this.renderChildren(item)}
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.main}>
          <Switch>
            {route.map((item, index) => (
              <Route key={index} path={item.path} component={item.components} />
            ))}
          </Switch>
        </main>
      </div>
    )
  }

  renderChildren(item) {
    const pathname = history.location.pathname

    if (item.children && item.children.length) {
      return (
        <ul>
          {item.children.map((subitem, subindex) => (
            <li key={subindex}>
              <Link
                className={subitem.path === pathname ? styles.active : ''}
                to={subitem.path}
              >
                {subitem.name}
              </Link>
            </li>
          ))}
        </ul>
      )
    }
  }
}

export default Container
