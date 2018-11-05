import React from 'react';  
import {connect} from 'react-redux';  
import history from './history';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth()
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        history.replace('/blog')
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.blog.user !== null
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}