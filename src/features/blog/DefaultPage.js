import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import GitHubLogin from 'react-github-login';
import GistList from './GistList'

export class DefaultPage extends Component {
  constructor(props) {
    super(props)

    this.loginSuccess = this.loginSuccess.bind(this)
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  loginSuccess(response) {
    // exchange for access token
    this.props.actions.exchangeToken(response.code)
  }

  render() {
    return (
      <div className="blog-default-page conainer">
        <h1 className="text-center">Blogging with Gist</h1>
        {
          this.props.blog.user ? (
            <div className="list-gists">
              <GistList />
            </div>
          ) : (
            <div className="text-center">
              {
                this.props.blog.loginErrors && (
                  <div className="login-error text-danger">{this.props.blog.loginErrors}</div>
                )
              }
              {
                this.props.blog.exchangeTokenPending && (
                  <div className="text-warning text-center">Requesting access token...</div>
                )
              }
              <GitHubLogin className="btn btn-primary" clientId="70ccaab5620f7524bd49"
                redirectUri={window.location.href}
                buttonText="Sign in to view your blog"
                scope="gist"
                onSuccess={this.loginSuccess}
                onFailure={this.props.actions.loginFailed} />
            </div>
          )
        }
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    blog: state.blog,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
