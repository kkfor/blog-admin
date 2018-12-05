import React, { Component, Fragment } from 'react';
import Header from './header'
import Container from './container'
import api from '@/api'

class App extends Component {
  async componentDidMount() {
    await api.qiniu.getToken()
  }
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
