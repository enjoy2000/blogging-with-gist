import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class GistComment extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchComments()
  }

  render() {
    const { fetchCommentsPending, fetchCommentsError, comments } = this.props.blog

    return (
      <div className="blog-gist-comment">
        {
          fetchCommentsPending && (
            <div className="loading text-center">Loading...</div>
          )
        }
        {
          fetchCommentsError ? (
            <div className="error">{fetchCommentsError.message}</div>
          ) : (
            <div>
              {
                comments.length > 0 && (
                  <ul className="blog-comments-list">
                    {
                      comments.map(comment => (
                        <li>
                          <div class="row comments mb-2">
                            <div class="col-md-2 col-sm-2 col-3 text-center user-img">
                                <img width="50" className="rounded-circle" src={comment.user.avatar_url} class="rounded-circle" alt="" />
                            </div>
                            <div class="col-md-9 col-sm-9 col-9 comment rounded mb-2">
                              <h4 class="m-0"><a href={comment.user.url}>{comment.user.login}</a></h4>
                                <small class="ml-3">{comment.created_at}</small>
                                <p class="mb-0">{comment.body}</p>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                )
              }
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
)(GistComment);
