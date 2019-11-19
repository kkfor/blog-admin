import React, { Component } from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { menu } from '../../router'
import { Menu } from 'antd'
import Cookies from 'js-cookie'
import history from '@/config/history'

const { SubMenu } = Menu

class Container extends Component {
  constructor(props) {
    super(props)

    const pathname = history.location.pathname
    // const openKey = menu.filter(item => pathname.includes(item.path))

    this.state = {
      pathname: '',
      // openKeys: [openKey[0].path],
      selectedKeys: [pathname]
    }
  }

  componentDidMount() {
    const token = Cookies.get('token')

    if (!token) {
      history.push('/login')
    }
  }
  render() {
    const { openKeys, selectedKeys } = this.state

    return (
      <aside className={styles.aside}>
        <div className={styles.logo}>Ant</div>
        <Menu
          defaultSelectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {menu.map(item =>
            item.children && item.children.length ? (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    <span>{item.name}</span>
                  </span>
                }
              >
                {item.children &&
                  item.children.map(subitem => (
                    <Menu.Item key={subitem.path}>
                      <Link to={subitem.path}>{subitem.name}</Link>
                    </Menu.Item>
                  ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.path}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </aside>
    )
  }
}

export default Container
