import React, { Component, Fragment } from 'react'
import { Table, Button, Modal } from 'antd'
import api from '@/api'
import styles from './index.scss'
import history from '@/config/history'

class CategoryList extends Component {
  constructor(props){
    super(props)
    this.state = {
      category: [],
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
        category: res.result
      })
    } catch(err) {
      console.error(err)
    }
  }

  edit(id) {
    const url = '/category/edit/' + id
    history.push(url)
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

  render() {
    let dataSource = this.state.category
    const columns = [
      {
        title: '分类名',
        dataIndex: 'slug',
        key: 'slug'
      },
      {
        title: '分类值',
        dataIndex: '_id',
        key: '_id'
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        render: id => 
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
      </div>
    )
  }
}

export default CategoryList