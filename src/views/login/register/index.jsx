import React, { Component } from 'react'
import styles from './index.scss'
import { Input, Button, Form } from 'antd'
import history from 'config/history'
import api from 'api'
import Cookies from 'js-cookie'

const FormItem = Form.Item

class Login extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if(!err) {
        try {
          const res = await api.user.register(values)
          // Cookies.set('token', res.data)
          history.push('/login')
        } catch(err){
          console.error(err)
        }
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.main}>
        <div className={styles.login}>
          <div className={styles.form}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('username')(
                  <Input placeholder="输入用户名"></Input>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password')(
                  <Input placeholder="输入密码"></Input>
                )}
              </FormItem>
              <Button block htmlType="submit" type="primary">注册</Button>
              </Form>
            </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)