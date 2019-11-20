import React, { Component } from 'react'
import styles from './index.module.scss'
import Cookies from 'js-cookie'
import history from '@/config/history'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null
    }
  }
  componentDidMount() {
    const username = Cookies.get('username')
    this.setState({
      username
    })
  }

  exit() {
    history.push('/login')
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.userName}>
          hello,{this.state.username} <span className={styles.exit} onClick={() => this.exit()}>退出</span>
        </div>
      </header>
    )
  }
}

export default Header
