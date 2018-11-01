import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'
import { Button, Input } from 'antd'
import api from '@/api'

class ArticleEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: null,
      content: null
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    if(id) {
      try {
        const res = await api.article.getArt(id)
        this.setState({
          id,
          title: res.data.title,
          content: BraftEditor.createEditorState(res.data.content)
        })
      } catch(err) {
        console.error(err)
      }
    }
  }

  handleEditorChange = (content) => {
    this.setState({content})
  }

  handleTitleChange = (e) => {
    const title = e.target.value
    this.setState({title})
  }

  uploadFn = (params) => {
    console.log(params)
  }

  submit = async publish => {
    let title = this.state.title
    let content = this.state.content.toHTML()
    let id = this.state.id
    try {
      if(id) {
        await api.article.putArt(id, {title, content, publish})
      } else {
        await api.article.postArt({title, content, publish})
      }
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    const { content, title } = this.state
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input placeholder="标题" value={title} onChange={this.handleTitleChange} />
          </div>
          <div className={styles.editor}>
            <BraftEditor
              defaultValue={content}
              value={content}
              // media={{uploadFn: this.uploadFn}}
              onChange={this.handleEditorChange}
              onSave={this.submit}
            />
          </div>
        </div>
        <div className={styles.articleSide}>
          <div className={styles.sideBlock}>
            <Button type="primary" onClick={this.submit.bind(this, true)}>发布</Button>
            <Button onClick={this.submit.bind(this, false)}>草稿</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleEdit