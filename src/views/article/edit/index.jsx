import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button, Input, Checkbox, Upload, notification } from 'antd'
import api from '@/api'
import { date, resizeImg } from '@/utils'
import config from '@/config'
import { qiniu } from '@/utils'
import Editor from 'for-editor'

const openNotification = ({ type = 'open', content }) => {
  notification[type]({
    message: '通知',
    description: content,
    duration: 2
  })
}
class ArticleEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      save: false,
      status: 2, // 1: 发布 | 2: 草稿
      id: null,
      title: null,
      content: '',
      category: [],
      categories: [],
      upToken: null,
      uploadFileName: '',
      uploadList: []
    }
  }

  async componentDidMount() {
    // this.getToken()
    const id = this.props.match.params.id
    if (id) {
      this.initItem(id)
      // this.initImage(id)
    }
    try {
      const categories = await api.category.getCategories()
      this.setState({
        categories: categories
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 初始化文章
  async initItem(id) {
    try {
      const arts = await api.article.getItem(id)
      this.setState({
        id,
        title: arts.title,
        content: arts.content,
        category: arts.category
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 初始化图片
  async initImage(id) {
    const res = await api.image.getList({ article: id })
    this.setState({
      uploadList: res.result
    })
  }

  async getToken() {
    const res = await api.qiniu.getToken()
    this.setState({
      upToken: res.result
    })
  }

  handleTitleChange = e => {
    const title = e.target.value
    this.setState({ title, save: false })
  }

  handleCategoryChange = e => {
    this.setState({
      category: e,
      save: false
    })
  }

  handleEditorChange = content => {
    this.setState({ content, save: false })
  }

  // 自定义上传
  customRequest(e) {
    const { id } = this.state
    if (!id) {
      openNotification({ type: 'error', content: '上传失败,请先发布文章' })
      return
    }

    const file = e.file
    this.imageHandler(file)
  }

  // 图片处理
  async imageHandler(file) {
    const { id } = this.state
    const { upToken, uploadList } = this.state
    const fileName = date(new Date(), 'yyyyMMdd_HHmmssSSS_') + file.name

    const newFile = await resizeImg(file)
    const res = await qiniu(newFile, fileName, upToken)

    const url = config.staticURL + '/' + res.key

    // 储存图片信息
    await api.image.postItem({
      article: id,
      image: fileName,
      url
    })

    uploadList.push({
      image: fileName,
      url
    })
    this.setState({
      uploadList
    })
  }

  // 修改文章状态
  changeStatus() {
    let { status } = this.state
    if (status === 1) {
      status = 2
    } else {
      status = 1
    }
    this.setState({
      status
    })
  }

  // 文章提交
  submit = async status => {
    const { title, id, category, content } = this.state
    try {
      if (id) {
        await api.article.putItem(id, { title, content, status, category })
      } else {
        const res = await api.article.postItem({
          title,
          content,
          status,
          category
        })
        window.history.pushState({}, '', '/article/edit/' + res._id)
        this.setState({
          status,
          id: res._id,
          save: true
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {
      save,
      id,
      content,
      title,
      categories,
      category,
      status,
      uploadList
    } = this.state
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input
              placeholder="标题"
              value={title}
              onChange={this.handleTitleChange}
            />
          </div>
          {/* <Upload
            customRequest={this.customRequest.bind(this)}
            showUploadList={false}
          >
            <Button>上传图片</Button>
          </Upload> */}
          {/* <div className={styles.imageList}>
            {
              uploadList.map((item, index) => (
                <div className={styles.imageItem} key={index}>
                  <img src={item.url} alt={item.image}/>
                  {item.image}
                </div>
              ))
            }
          </div> */}
          <div className={styles.editor}>
            <Editor
              value={content}
              onChange={this.handleEditorChange}
              onSave={() => this.submit(status)}
            />
          </div>
        </div>
        <div className={styles.articleSide}>
          <div className={styles.submit}>
            {save && <Button type="link" disabled>
                已保存
              </Button> }
            {(!id || status === 2) && (
              <Button type="link" onClick={this.submit.bind(this, 2)}>
                保存草稿
              </Button>
            )}
            {status === 1 && (
              <Button type="link" onClick={() => this.changeStatus()}>
                切换为草稿
              </Button>
            )}
            <Button
              type="primary"
              onClick={this.submit.bind(this, 1)}
              className={styles.publish}
            >
              {status === 1 ? '更新' : '发布'}
            </Button>
          </div>
          <div className={styles.sideBlock}>
            <h4>分类</h4>
            <ul>
              <Checkbox.Group
                onChange={this.handleCategoryChange}
                value={category}
              >
                {categories.map((item, index) => (
                  <li key={index}>
                    <Checkbox value={item._id}>{item.slug}</Checkbox>
                  </li>
                ))}
              </Checkbox.Group>
            </ul>
          </div>
          {/* <div className={styles.sideBlock}>
            <h4>标签</h4>
            <ul>
              <Checkbox.Group onChange={this.handleCategoryChange} value={category}>
                {
                  categories.map((item, index) => <li key={index}><Checkbox value={item._id}>{item.slug}</Checkbox></li>)
                }
              </Checkbox.Group>
            </ul>
          </div> */}
        </div>
      </div>
    )
  }
}

export default ArticleEdit
