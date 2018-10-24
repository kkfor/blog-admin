import React from 'react'
import classNames from 'classnames'

export default props => {
  const { type, size } = props
  const classes = classNames({
    [`fo-${type}`]: true
  })
  return <i className={classes}></i>
}