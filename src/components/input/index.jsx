import React from 'react'
import styles from './index.scss'

export default props => {
  const { placeholder } = props
  return <input type="text" placeholder={placeholder} className={styles.input} />
}