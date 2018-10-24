import React, { Component } from 'react'
import styles from './index.scss'
import classNames from 'classnames'

class Button extends Component {
  static defaultProps = {
    prefixCls: 'fo-btn'
  }

  render() {
    const props = this.props
    const { type, children, prefixCls } = props
    const classes = classNames({
      [prefixCls]: true,
      [`${prefixCls}-${type}`]: type
    })
    // const content = React.Children.map(children, function(child) {
    //   console.log(child)
    // })
    return <button className={classes}>{children}</button>
  }
}

export default Button