import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import styles from './index.scss'
import { Button, Input, Checkbox, Upload } from 'antd'
import api from '@/api'
import { date, resizeImg } from '@/utils'
import config from '@/config'
import { qiniu } from '@/utils'

const { TextArea } = Input
class ArticleEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      title: null,
      content: null,
      category: [],
      categories: [],
      upToken: null,
      uploadFileName: '',
      uploadList: []
    }
  }

  async componentDidMount() {
    this.getToken()
    const id = this.props.match.params.id
    if (id) {
      try {
        const arts = await api.article.getItem(id)
        this.setState({
          id,
          title: arts.result.title,
          // content: BraftEditor.createEditorState(arts.result.content),
          content: arts.result.content,
          category: arts.result.category
        })
      } catch (err) {
        console.error(err)
      }
    }
    try {
      const categories = await api.category.getCategories()
      this.setState({
        categories: categories.result
      })
    } catch (err) {
      console.error(err)
    }
  }

  async getToken() {
    const res = await api.qiniu.getToken()
    this.setState({
      upToken: res.result
    })
  }

  handleTitleChange = (e) => {
    const title = e.target.value
    this.setState({ title })
  }

  handleCategoryChange = (e) => {
    this.setState({
      category: e
    })
  }

  handleEditorChange = (e) => {
    const content = e.target.value
    this.setState({ content })
  }
  
  // 自定义上传
  async customRequest(e) {
    const file = e.file
    const { upToken, uploadList } = this.state
    const fileName = date(new Date(), 'yyyyMMdd_HHmmssSSS_') + file.name

    const newFile = await resizeImg(file)
    const res = await qiniu(newFile, fileName, upToken)

    const url = config.staticURL + '/' + res.key
    uploadList.push({
      fileName,
      url
    })
    this.setState({
      uploadList
    })

    console.log(newFile)
  }

  submit = async publish => {
    const { title, id, category, content } = this.state
    // let content = this.state.content.toHTML()
    try {
      if (id) {
        await api.article.putItem(id, { title, content, publish, category })
      } else {
        await api.article.postItem({ title, content, publish, category })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { content, title, categories, category, uploadList } = this.state
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input placeholder="标题" value={title} onChange={this.handleTitleChange} />
          </div>
          <Upload
            customRequest={this.customRequest.bind(this)}
            showUploadList={false}
          >
            <Button>上传图片</Button>
          </Upload>
          <div>
            {
              uploadList.map((item, index) => (
                <div key={index}>
                  <span>
                    {item.fileName}
                  </span>-
                  <span>
                    {item.url}
                  </span>
                </div>
              ))
            }
          </div>
          <div className={styles.editor}>
            {/* <BraftEditor
              defaultValue={content}
              value={content}
              // media={{uploadFn: this.uploadFn}}
              onChange={this.handleEditorChange}
              onSave={this.submit}
            /> */}
            <TextArea rows={4} value={content} className={styles.textarea} onChange={this.handleEditorChange}/>
          </div>
        </div>
        <div className={styles.articleSide}>
          <div className={styles.submit}>
            <Button type="primary" onClick={this.submit.bind(this, true)} className={styles.publish}>发布</Button>
            <Button onClick={this.submit.bind(this, false)}>草稿</Button>
          </div>
          <div className={styles.sideBlock}>
            <h4>分类</h4>
            <ul>
              <Checkbox.Group onChange={this.handleCategoryChange} value={category}>
                {
                  categories.map((item, index) => <li key={index}><Checkbox value={item._id}>{item.slug}</Checkbox></li>)
                }
              </Checkbox.Group>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleEdit