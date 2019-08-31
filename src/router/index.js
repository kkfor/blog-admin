
import articleList from '@/views/article/list'
import articleEdit from '@/views/article/edit'
import categoryList from '@/views/category/list'
import categoryEdit from '@/views/category/edit'
import tagList from '@/views/tag/list'
import tagEdit from '@/views/tag/edit'
import commentList from '@/views/comment/list'

const route = [
  {
    icon: '',
    path: '/article',
    name: '文章',
    children: [
      {
        icon: '',
        path: '/list',
        name: '所有文章',
        components: articleList
      },
      {
        icon: '',
        path: '/edit/:id',
        name: '修改文章',
        hide: true,
        components: articleEdit
      },
      {
        icon: '',
        path: '/edit',
        name: '撰写文章',
        components: articleEdit
      }
    ]
  },
  {
    icon: '',
    path: '/category',
    name: '分类',
    children: [
      {
        icon: '',
        path: '/list',
        name: '所有分类',
        components: categoryList
      },
      {
        icon: '',
        path: '/edit/:id',
        name: '修改分类',
        hide: true,
        components: categoryEdit
      },
      {
        icon: '',
        path: '/edit',
        name: '添加分类',
        components: categoryEdit
      }
    ]
  },
  {
    icon: '',
    path: '/tag',
    name: '标签',
    children: [
      {
        icon: '',
        path: '/list',
        name: '所有标签',
        components: tagList
      },
      {
        icon: '',
        path: '/edit/:id',
        name: '修改标签',
        hide: true,
        components: tagEdit
      },
      {
        icon: '',
        path: '/edit',
        name: '添加标签',
        components: categoryEdit
      }
    ]
  },
  {
    icon: '',
    path: '/comment',
    name: '评论',
    children: [
      {
        icon: '',
        path: '/list',
        name: '评论列表',
        components: commentList
      }
    ]
  }
]

export default route