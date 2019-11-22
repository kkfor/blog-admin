import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Pagination, Button, Modal } from 'antd'
import api from '@/api'
import styles from './index.module.scss'
import history from '@/config/history'
import { date } from '@/utils'

class ArticleList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      total: null,
      page: 1,
      limit: 15,
      status: null // 0 草稿 | 1 发布 | 2 回收站
    }
  }

  componentDidMount() {
    this.getList()
  }

  async getList(page = 1, status = null) {
    const { limit } = this.state
    try {
      const res = await api.article.getList({
        page,
        status,
        limit: limit
      })
      this.setState({
        posts: res.data,
        total: res.total,
        status
      })
    } catch (err) {
      console.error(err)
    }
  }

  edit(e, id) {
    e.stopPropagation()
    const url = '/article/edit/' + id
    history.push(url)
  }

  delete(e, id) {
    e.stopPropagation()
    const { page } = this.state
    let that = this
    Modal.confirm({
      title: '提示?',
      content: '确定要删除吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await api.article.delItem(id)
        that.getList(page)
      }
    })
  }

  paginationChange = page => {
    this.setState({
      page
    })
    this.getList(page)
  }

  render() {
    const { posts, limit, status, total } = this.state
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        render: (e, r) => {
          let title = <><b>{e}</b> — 草稿</>
          if (r.status === 1) {
            title = <b>{e}</b>
          } else if (r.status === 0) {
            title = <><b>{e}</b> — 回收站</>
          }
          return <span className={styles.title}>{title}</span>
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: '200px',
        render: e => date(e, 'yyyy/MM/dd HH:mm:ss')
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        width: '200px',
        render: e => date(e, 'yyyy/MM/dd HH:mm:ss')
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        width: '150px',
        render: id => (
          <Fragment>
            <Button onClick={e => this.edit(e, id)}>编辑</Button>{' '}
            <Button onClick={e => this.delete(e, id)} type="danger">
              删除
            </Button>
          </Fragment>
        )
      }
    ]

    const articleFilter = [
      {
        text: '全部文章',
        status: null
      },
      {
        text: '已发布',
        status: 1
      },
      {
        text: '草稿箱',
        status: 2
      },
      {
        text: '回收站',
        status: 0
      }
    ]

    return (
      <div className={styles.list}>
        <div className={styles.top}>
          <h2>文章</h2>
          <Link to="/article/edit">写文章</Link>
        </div>
        <div className={styles.articleType}>
          {articleFilter.map((item, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => this.getList(1, item.status)}
                className={status === item.status ? styles.active : ''}
              >
                {item.text}
                {status === item.status && <span>({total})</span>}
              </span>
              {index !== articleFilter.length - 1 && ' | '}
            </React.Fragment>
          ))}
        </div>
        <Table
          bordered
          size="middle"
          className={styles.table}
          pagination={false}
          columns={columns}
          dataSource={posts}
          rowKey="_id"
          onRow={record => {
            return {
              onClick: e => {
                history.push(`/article/edit/${record._id}`)
              }
            }
          }}
        />
        <Pagination
          defaultPageSize={limit}
          total={this.state.total}
          className={styles.pagination}
          onChange={this.paginationChange}
        />
      </div>
    )
  }
}

export default ArticleList
