import React, { Component } from 'react'
import { Table } from 'antd'
import api from '@/api'

class ArticleList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    try {
      api.article.getArts()
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    const columns = [
      {title: 'name'}
    ]
    return (
      <div>
        <Table></Table>
      </div>
    )
  }
}

export default ArticleList