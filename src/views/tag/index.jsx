import React, { Component, Fragment } from 'react'
import { Table, Button, Modal, Input, Form } from 'antd'
import api from '@/api'
import styles from './index.module.scss'

const FormItem = Form.Item

class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      name: null,
      slug: null,
      url: null,
      tag: [],
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
      const res = await api.tag.getTags()
      this.setState({
        tag: res
      })
    } catch (err) {
      console.error(err)
    }
  }

  async edit(id) {
    try {
      const res = await api.tag.getTag(id)
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

  resetForm() {
    this.setState(
      {
        id: null,
        name: null,
        slug: null,
        url: null
      },
      () => {
        this.props.form.resetFields()
      }
    )
  }

  addTag() {
    this.resetForm()
    this.setState({
      editStatus: false
    })
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
        await api.tag.delTag(id)
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
            await api.tag.putTag(id, values)
          } else {
            await api.tag.postTag(values)
          }
          this.resetForm()
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

    let dataSource = this.state.tag

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
          <h2>标签</h2>
          {editStatus && <span onClick={() => this.addTag()}>新增标签</span>}
        </div>
        <div className={styles.list}>
          <div className={styles.edit}>
            <Form onSubmit={this.handleSubmit} className={styles.form}>
              <FormItem>
                {getFieldDecorator('name', {
                  initialValue: name
                })(<Input placeholder="输入标签名"></Input>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('slug', {
                  initialValue: slug
                })(<Input placeholder="输入标签别名"></Input>)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('url', {
                  initialValue: url
                })(<Input placeholder="输入标签url"></Input>)}
              </FormItem>
              {editStatus ? (
                <Button htmlType="submit" type="primary">
                  修改标签
                </Button>
              ) : (
                <Button htmlType="submit" type="primary">
                  新增标签
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

export default Form.create()(Tag)
