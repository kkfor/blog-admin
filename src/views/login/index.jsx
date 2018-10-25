import React, { Component } from 'react'
import styles from './index.scss'
import { Input, Button } from 'antd'

class Login extends Component {
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.form}>
            <div>
              <Input placeholder="输入用户名"></Input>
            </div>
            <div>
              <Input placeholder="输入密码"></Input>
            </div>
            <Button block type="primary">登录</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login