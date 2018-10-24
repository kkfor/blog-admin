import React, { Component, Fragment } from 'react'
import styles from './index.scss'
import Icon from 'components/icon'
import About from 'views/article/edit'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class Container extends Component {
  render() {
    return (
      <Fragment>
          <aside className={styles.aside}>
            <ul>
              <li>
                <div>文章</div>
              </li>
              <li className={styles.active}>
                <div>项目2</div>
                <ul>
                  <li>子1</li>
                  <li>子2</li>
                </ul>
              </li>
            </ul>
          </aside>
          <main className={styles.main}>
          <Router>
            <Route path="/" component={About} />
          </Router>
          </main>
        </Fragment>
    )
  }

  menu() {
    
  }
}

export default Container