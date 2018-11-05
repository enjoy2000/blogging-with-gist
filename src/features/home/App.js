import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header'

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app">
        <Header />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}
