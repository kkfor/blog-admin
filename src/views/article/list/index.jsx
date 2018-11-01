import React, { Component, Fragment } from 'react'
import { Table, Pagination, Button, Modal } from 'antd'
import api from '@/api'
import styles from './index.scss'
import history from '@/config/history'

class ArticleList extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      total: null,
      table: {
        pagination: false
      }
    }

  }

  async componentDidMount() {
    try {
      const res = await api.article.getArts()
      this.setState({
        posts: res.data.arts,
        total: res.data.total
      })
    } catch(err) {
      console.error(err)
    }
  }

  edit(id) {
    const url = '/article/edit/' + id
    history.push(url)
  }

  delete(id) {
    Modal.confirm({
      title: '提示?',
      content: '确定要删除吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await api.article.delArt(id)
      }
    });
  }

  render() {
    let dataSource = this.state.posts
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '状态',
        dataIndex: 'publish',
        key: 'publish',
        render: (e) => e ? '发布' : '草稿'
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        key: 'createAt'
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        key: 'updateAt'
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: (id) => 
        (
          <Fragment>
            <Button onClick={this.edit.bind(this, id)}>编辑</Button>
            <Button onClick={this.delete.bind(this, id)} type="danger">删除</Button>
          </Fragment>
        )
      }
    ]
    return (
      <div className={styles.list}>
        <Table {...this.state.table} columns={columns} dataSource={dataSource} rowKey="_id" className={styles.table} />
        <Pagination total={this.state.total} className={styles.pagination} />
      </div>
    )
  }
}

export default ArticleList