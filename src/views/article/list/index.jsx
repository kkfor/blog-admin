import React, { Component, Fragment } from 'react'
import { Table, Pagination, Button } from 'antd'
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

  edit(e) {
    const url = '/article/edit/' + e
    history.push(url)
  }

  delete() {

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
        render: (e) => 
        (
          <Fragment>
            <Button onClick={this.edit.bind(this, e)}>编辑</Button>
            <Button onClick={this.delete.bind(this, e)} type="danger">删除</Button>
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