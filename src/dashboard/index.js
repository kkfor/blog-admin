import React, { Component } from 'react'
import styles from './index.scss'
console.log(styles)

class dashboard extends Component {
  render() {
    return (
      <div>
        <header className={styles.header}>header</header>
        <aside></aside>
      </div>
    )
  }
}

export default dashboard