import React, { Component } from 'react'
import { Table } from 'antd'
import api from '@/api'
import styles from './index.scss'

class ArticleList extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    listData: null
  }

  async componentDidMount() {
    try {
      const list = await api.article.getArts()
      this.setState({
        listData: list.data.arts
      })
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    let dataSource = this.state.listData
    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '状态',
        dataIndex: 'publish',
        key: 'publish'
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
        title: '操作'
      }
    ]
    return (
      <div class={styles.list}>
        <Table columns={columns} dataSource={dataSource}></Table>
      </div>
    )
  }
}

export default ArticleList