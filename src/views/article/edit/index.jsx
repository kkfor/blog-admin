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
      save: 0, // 0: 第一次进入 | 1: 可以保存 | 2: 已保存
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

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  // 初始化文章
  async initItem(id) {
    try {
      const art = await api.article.getItem(id)
      this.setState({
        id,
        status: art.status,
        title: art.title,
        content: art.content,
        category: art.category
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

  handleChange(value, label) {
    const { status } = this.state
    this.setState({
      [label]: value,
      save: 1
    })
    if (status === 2) {
      clearInterval(this.timer)
      this.timer = setTimeout(() => {
        this.onSave()
      }, 10000)
    }
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

  // 保存文章
  async onSave() {
    const { title, id, category, content, status } = this.state
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
          id: res._id
        })
      }
      this.setState({
        save: 2
      })
    } catch (err) {
      console.error(err)
    }
  }

  // 修改状态并保存
  submit(status) {
    this.setState(
      {
        status
      },
      () => {
        this.onSave()
      }
    )
  }

  submitRender() {
    const { save, id, status } = this.state
    return (
      <div className={styles.submit}>
        {save === 2 && status === 2 && (
          <Button type="link" disabled>
            已保存({date(Date.now(), 'HH:mm')})
          </Button>
        )}
        {(!id || status === 2) && (
          <Button
            type="link"
            disabled={save !== 1}
            onClick={() => this.submit(2)}
          >
            保存草稿
          </Button>
        )}
        {status === 1 && (
          <Button type="link" onClick={() => this.submit(2)}>
            切换为草稿
          </Button>
        )}
        <Button
          type="primary"
          disabled={save !== 1 && status === 1}
          onClick={() => this.submit(1)}
          className={styles.publish}
        >
          {status === 1 ? '更新' : '发布'}
        </Button>
      </div>
    )
  }

  render() {
    const { content, title, categories, category, uploadList } = this.state
    return (
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.title}>
            <Input
              placeholder="标题"
              value={title}
              onChange={e => this.handleChange(e.target.value, 'title')}
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
              onChange={e => this.handleChange(e, 'content')}
              onSave={() => this.onSave()}
            />
          </div>
        </div>
        <div className={styles.articleSide}>
          {this.submitRender()}
          <div className={styles.sideBlock}>
            <h4>分类</h4>
            <ul>
              <Checkbox.Group
                onChange={e => this.handleChange(e, 'category')}
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
