import React, { Component, Fragment } from 'react'
import { Table, Pagination, Button, Modal } from 'antd'
import api from '@/api'
import styles from './index.scss'
import history from '@/config/history'
import { date } from '@/utils'

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      total: null,
      table: {
        pagination: false
      }
    }
  }

  componentDidMount() {
    this.getList()
  }

  async getList(page = 1) {
    try {
      const res = await api.comment.getList({
        page
      })
      this.setState({
        list: res.result.data,
        total: res.result.total
      })
    } catch (err) {
      console.error(err)
    }
  }

  paginationChange(page) {
    this.getList(page)
  }

  reply(id) {
    
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
        await api.article.delItem(id)
        that.init()
      }
    })
  }

  render() {
    let { list } = this.state
    const columns = [
      {
        title: '文章标题',
        dataIndex: 'article.title',
        key: 'article.title'
      },
      {
        title: '评论内容',
        dataIndex: 'content',
        key: 'content',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '评论者',
        dataIndex: 'user.name',
        key: 'user.name'
      },
      {
        title: '评论者邮箱',
        dataIndex: 'user.email',
        key: 'user.email'
      },
      {
        title: '评论者网站',
        dataIndex: 'user.site',
        key: 'user.site',
        render: e => (e ? e : '未填')
      },
      {
        title: '评论时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (e) => date(e)
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: (id) =>
          (
            <Fragment>
              <Button onClick={this.reply.bind(this, id)} type="primary">回复</Button>
              <Button onClick={this.delete.bind(this, id)} type="danger">删除</Button>
            </Fragment>
          )
      }
    ]
    return (
      <div className={styles.list}>
        <Table pagination={false} columns={columns} dataSource={list} rowKey="_id" className={styles.table} />
        <Pagination total={this.state.total} className={styles.pagination} onChange={this.paginationChange} />
      </div>
    )
  }
}

export default CommentList