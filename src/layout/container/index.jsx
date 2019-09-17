import React, { Component } from 'react'
import styles from './index.module.scss'
import { Route, Link, Switch } from 'react-router-dom'
import { route, menu } from '../../router'
import { Menu } from 'antd'
import Cookies from 'js-cookie'
import history from '@/config/history'

const { SubMenu } = Menu

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
          <Menu
            defaultSelectedKeys={[]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            {menu.map((item, index) => (
              item.children && item.children.length ? 
              <SubMenu
                key={index}
                title={
                  <span>
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.children &&
                  item.children.map((subitem, subindex) => (
                    <Menu.Item key={`sub${subindex}`}>
                      <Link to={subitem.path}>{subitem.name}</Link>
                    </Menu.Item>
                  ))}
              </SubMenu> :
              <Menu.Item key={index}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </aside>
        <header className={styles.header}>1234</header>
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
}

export default Container
