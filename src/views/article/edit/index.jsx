import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'
import Input from 'components/input'
import Button from 'components/button'

class ArticleEdit extends Component {
  render() {
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input placeholder="标题" />
          </div>
          <div className={styles.editor}>
            <BraftEditor />
          </div>
        </div>
        <div className={styles.articleSide}>
          <div className={styles.sideBlock}>
            <Button>保存</Button>
            <Button>草稿</Button>
          </div>
          <div>dfdfsdfsdf</div>
        </div>
      </div>
    )
  }
}

export default ArticleEdit