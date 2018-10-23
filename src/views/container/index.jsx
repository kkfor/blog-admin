import React, { Component, Fragment } from 'react'
import './index.scss'
import Icon from 'components/icon'

class Container extends Component {
  render() {
    return (
      <Fragment>
        <aside>
          <ul>
            <li>
              <div><Icon></Icon>项目1</div>
            </li>
            <li>
              <div><Icon></Icon>项目2</div>
              <ul></ul>
            </li>
          </ul>
        </aside>
        <main></main>
      </Fragment>
    )
  }

  menu() {
    
  }
}

export default Container