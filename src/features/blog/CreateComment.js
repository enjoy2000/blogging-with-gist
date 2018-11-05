import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class CreateComment extends Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  state = {
    comment: '',
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    commentsUrl: PropTypes.string.isRequired,
  };

  onChange(e) {
    this.setState({
      comment: e.target.value
    })
  }

  submit(e) {
    e.preventDefault()

    this.props.actions.createComment(this.state.comment)
    this.setState({
      comment: '',
    })
  }

  render() {
    const { createCommentPending, createCommentError } = this.props.blog
    return (
      <form onSubmit={this.submit} className="blog-create-comment">
        <div className="row comment-box-main p-3 rounded-bottom">
			  		<div className="col-md-9 col-sm-9 col-9 pr-0 comment-box">
					  <input value={this.state.comment}
              onChange={this.onChange}
              type="text" className="form-control" placeholder="comment ...." />
			  		</div>
			  		<div className="col-md-3 col-sm-2 col-2 pl-0 text-center send-btn">
			  			<button disabled={createCommentPending} type="submit" className="btn btn-info">
                {createCommentPending && (
                  <span>
                    &nbsp;
                    <i className="fa fa-circle-o-notch fa-spin" />
                    &nbsp;
                  </span>
                )}
                Send
              </button>
              {createCommentError && (
                <div className="text-danger">{createCommentError.message}</div>
              )}
			  		</div>
				</div>
      </form>
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
)(CreateComment);
