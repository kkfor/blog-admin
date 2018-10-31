
import articleList from '@/views/article/list'
import articleEdit from '@/views/article/edit'

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
        path: '/edit',
        name: '撰写文章',
        components: articleEdit
      }
    ]
  },
  {
    icon: '',
    path: '/article',
    name: '分类',
    children: []
  }
]

export default route