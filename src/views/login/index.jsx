import React, { Component } from 'react'
import styles from './index.scss'
import { Input, Button, Form } from 'antd'
import history from 'config/history'

const FormItem = Form.Item

class Login extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log(values)
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
                <Input placeholder="输入密码"></Input>
              </FormItem>
              <Button block htmlType="submit" type="primary">登录</Button>
              </Form>
            </div>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)