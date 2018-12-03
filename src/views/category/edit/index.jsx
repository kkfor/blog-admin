import React, { Component } from 'react'
import styles from './index.scss'
import { Input, Button, Form } from 'antd'
import api from '@/api'

const FormItem = Form.Item

class CategoryEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      slug: null,
      url: null
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    if(id) {
      try {
        const res = await api.category.getCategory(id)
        this.setState({
          id,
          slug: res.result.slug
        })
      } catch(err) {
        console.error(err)
      }
    }
  }

  handleSubmit = (e) => {
    const id = this.state.id
    e.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if(!err) {
        try {
          if(id) {
            await api.category.putCategory(id, values)
          } else {
            await api.category.postCategory(values)
          }
        } catch(err){
          console.error(err)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { slug, url } = this.state
    return (
      <div className={styles.main}>
        <Form onSubmit={this.handleSubmit} className={styles.form}>
          <FormItem>
            {getFieldDecorator('slug', {
              initialValue: slug
            })(
              <Input placeholder="输入分类名"></Input>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('url', {
              initialValue: url
            })(
              <Input placeholder="输入分类url"></Input>
            )}
          </FormItem>
          <Button htmlType="submit" type="primary">提交</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CategoryEdit)