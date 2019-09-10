import articleList from '@/views/article/list'
import articleEdit from '@/views/article/edit'
import categoryList from '@/views/category/list'
import categoryEdit from '@/views/category/edit'
import tagList from '@/views/tag/list'
import tagEdit from '@/views/tag/edit'
import commentList from '@/views/comment/list'

// 菜单
const menu = [
  {
    icon: '',
    path: '/article/list',
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
        path: '/category/list',
        name: '分类'
      },
      {
        icon: '',
        path: '/tag/list',
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
    path: '/article/edit',
    name: '撰写文章',
    components: articleEdit
  },
  {
    path: '/article/edit/:id',
    name: '修改文章',
    components: articleEdit
  },

  // 分类
  {
    path: '/category/list',
    name: '分类',
    components: categoryList
  },
  {
    icon: '',
    path: '/category/list',
    name: '所有分类',
    components: categoryList
  },
  {
    icon: '',
    path: '/category/edit/:id',
    name: '修改分类',
    hide: true,
    components: categoryEdit
  },
  {
    icon: '',
    path: '/category/edit',
    name: '添加分类',
    components: categoryEdit
  },

  // 标签
  {
    icon: '',
    path: '/tag/list',
    name: '标签'
  },
  {
    icon: '',
    path: '/tag/list',
    name: '所有标签',
    components: tagList
  },
  {
    icon: '',
    path: '/tag/edit/:id',
    name: '修改标签',
    hide: true,
    components: tagEdit
  },
  {
    icon: '',
    path: '/tag/edit',
    name: '添加标签',
    components: categoryEdit
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
