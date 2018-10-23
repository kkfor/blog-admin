import React, { Component, Fragment } from 'react';
import Header from './header'
import Container from './container'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header></Header>
        <Container></Container>
      </Fragment>
    );
  }
}

export default App;
