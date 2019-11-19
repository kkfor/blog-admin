import React, { Component, Fragment } from 'react'
import { Table, Button, Modal, Input, Form } from 'antd'
import api from '@/api'
import styles from './index.module.scss'
import history from '@/config/history'

const FormItem = Form.Item

class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      slug: null,
      url: null,
      category: [],
      editStatus: false, // false: 新增状态 | true: 编辑状态
      table: {
        pagination: false
      }
    }
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    try {
      const res = await api.category.getCategories()
      this.setState({
        category: res
      })
    } catch (err) {
      console.error(err)
    }
  }

  async edit(id) {
    try {
      const res = await api.category.getCategory(id)
      this.setState(
        {
          editStatus: true,
          id,
          name: res.name,
          slug: res.slug,
          url: res.url
        },
        () => {
          this.props.form.resetFields()
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  addCategory() {
    this.setState(
      {
        id: null,
        name: null,
        slug: null,
        url: null,
        editStatus: false
      },
      () => {
        this.props.form.resetFields()
      }
    )
  }

  delete(id) {
    let that = this
    Modal.confirm({
      title: '提示?',
      content: '确定要删除吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await api.category.delCategory(id)
        that.init()
      }
    })
  }

  handleSubmit = e => {
    const id = this.state.id
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          if (id) {
            await api.category.putCategory(id, values)
          } else {
            await api.category.postCategory(values)
          }
          this.init()
        } catch (err) {
          console.error(err)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { name, slug, url, editStatus } = this.state

    let dataSource = this.state.category

    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '分类别名',
        dataIndex: 'slug',
        key: 'slug'
      },
      {
        title: 'url',
        dataIndex: 'url',
        key: 'url'
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: id => (
          <Fragment>
            <Button onClick={this.edit.bind(this, id)}>编辑</Button>{' '}
            <Button onClick={this.delete.bind(this, id)} type="danger">
              删除
            </Button>
          </Fragment>
        )
      }
    ]
    return (
      <div className={styles.main}>
        <div className={styles.top}>
          <h2>分类</h2>
          {editStatus && (
            <span onClick={() => this.addCategory()}>新增分类</span>
          )}
        </div>
        <div className={styles.list}>
          <div className={styles.edit}>
            <Form onSubmit={this.handleSubmit} className={styles.form}>
              <FormItem>
                {getFieldDecorator('name', {
                  initialValue: name
                })(<Input placeholder="输入分类名"></Input>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('slug', {
                  initialValue: slug
                })(<Input placeholder="输入分类别名"></Input>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('url', {
                  initialValue: url
                })(<Input placeholder="输入分类url"></Input>)}
              </FormItem>
              {editStatus ? (
                <Button htmlType="submit" type="primary">
                  修改分类
                </Button>
              ) : (
                <Button htmlType="submit" type="primary">
                  新增分类
                </Button>
              )}
            </Form>
          </div>
          <Table
            {...this.state.table}
            columns={columns}
            dataSource={dataSource}
            rowKey="_id"
            className={styles.table}
          />
        </div>
      </div>
    )
  }
}

export default Form.create()(Category)
