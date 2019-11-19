import articleList from '@/views/article/list'
import articleEdit from '@/views/article/edit'
import category from '@/views/category'
import tag from '@/views/tag'
import commentList from '@/views/comment/list'

// 菜单
const menu = [
  {
    icon: '',
    path: '/article',
    name: '文章',
    children: [
      {
        icon: '',
        path: '/article/list',
        name: '所有文章'
      },
      {
        icon: '',
        path: '/article/edit',
        name: '撰写文章'
      },
      {
        icon: '',
        path: '/category',
        name: '分类'
      },
      {
        icon: '',
        path: '/tag',
        name: '标签'
      }
    ]
  },
  {
    icon: '',
    path: '/comment/list',
    name: '评论',
    components: commentList
  }
]

// 路由
const route = [
  // 文章
  {
    path: '/article/list',
    name: '文章列表',
    components: articleList
  },
  {
    path: '/article/edit/:id',
    name: '修改文章',
    components: articleEdit
  },
  {
    path: '/article/edit',
    name: '撰写文章',
    components: articleEdit
  },

  // 分类
  {
    path: '/category',
    name: '分类',
    components: category
  },

  // 标签
  {
    icon: '',
    path: '/tag',
    name: '标签',
    components: tag
  },

  // 评论
  {
    icon: '',
    path: '/comment/list',
    name: '评论',
    components: commentList
  }
]

export { route, menu }
