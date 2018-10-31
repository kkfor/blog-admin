import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'
import { Button, Input } from 'antd'
import api from '@/api'

class ArticleEdit extends Component {
  state = {
    title: null,
    editorState: null
  }

  handleEditorChange = (editorState) => {
    this.setState({editorState})
  }

  handleTitleChange = (title) => {
    this.setState({title})
  }

  uploadFn = (params) => {
    console.log(params)
  }

  submitContent = async () => {
    let title = this.state.title
    let content = this.state.editorState.toHTML()
    try {
      await api.article.postArt({title, content})
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    const { editorState } = this.state
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input placeholder="标题" onChange={this.handleTitleChange} />
          </div>
          <div className={styles.editor}>
            <BraftEditor
              value={editorState}
              // media={{uploadFn: this.uploadFn}}
              onChange={this.handleEditorChange}
              onSave={this.submitContent}
            />
          </div>
        </div>
        <div className={styles.articleSide}>
          <div className={styles.sideBlock}>
            <Button type="primary" onClick={this.submitContent}>保存</Button>
            <Button>草稿</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleEdit