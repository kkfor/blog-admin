import React, { Component } from 'react'

class Button extends Component {

  render() {
    const props = this.props
    const { children } = props
    const content = React.Children.map(children, function(child) {
      console.log(child)
    })
    return <button>{children}</button>
  }
}

export default Button