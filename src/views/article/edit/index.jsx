import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'

class ArticleEdit extends Component {
  render() {
    return (
      <div class={styles.editor}>
        <BraftEditor />
      </div>
    )
  }
}

export default ArticleEdit