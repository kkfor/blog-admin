import React, { Component } from 'react'
import styles from './index.module.scss'
import Cookies from 'js-cookie'

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
  render() {
    return (
      <header className={styles.header}>
      <span className={styles.userName}>
        hello,{this.state.username}
      </span>
      </header>
    )
  }
}

export default Header