import React, { Component } from 'react'
import Aside from './aside'
import Main from './main'
import styles from './App.module.scss'

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Aside />
        <Main/>
      </div>
    )
  }
}

export default App
