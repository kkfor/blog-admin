import React, { Component, Fragment } from 'react'
import styles from './index.scss'
import Icon from 'components/icon'
import About from 'views/article/edit'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import route from '../../router'

class Container extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <aside className={styles.aside}>
            <ul>
              { route.map((item, index) => 
                <li key={index}>
                  <div>{item.name}</div>
                  {this.renderChildren(item.children)}
                </li>
                )
              }
            </ul>
          </aside>
          <main className={styles.main}>
          {
            route.map((item, index) =>
              this.renderChildren(item.children, true)
            )
          }
            {/* <Route path="/" component={About} /> */}
          </main>
        </Fragment>
      </Router>
    )
  }

  renderChildren(item, route) {
    if(item || Boolean(item.length)) {
      if(route) {
        return (
          item.map((subitem, subindex) => 
            <Route key={subindex} path={subitem.path} component={subitem.components} />
          )
        )
      } else {
        return (
          <ul>
          {
            item.map((subitem, subindex) => 
              <li key={subindex}><Link to={subitem.path}>{subitem.name}</Link></li>
            )
          }
        </ul> 
        )
      }
    }
  }
}

export default Container