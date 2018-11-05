import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export class CreateGist extends Component {
  constructor(props) {
    super(props)

    this.onEditorStateChange = (editorState) => {
      this.setState({
        editorState
      })
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
  }

  state = {
    editorState: EditorState.createEmpty(),
    title: '',
  }

  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onChangeInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    this.props.actions.createGist({
      title: this.state.title,
      content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
    })
  }

  render() {
    const {createGistPending, createGistError, createdGist} = this.props.blog
    return (
      <div className="blog-create-gist">
        <h1 className="text-center">Create a post</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input 
              onChange={this.onChangeInput}
              value={this.state.title}
              required type="text" className="form-control" id="title" name="title" />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <Editor
              editorState={this.state.editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>

          
          <div className="form-group">
            <button type="submit" className="btn btn-primary" id="submit" disabled={createGistPending}>
              {createGistPending && (
                <span>
                  &nbsp;
                  <i className="fa fa-circle-o-notch fa-spin" />
                  &nbsp;
                </span>
              )}
              Submit
            </button>
            {createGistError && (
              <div className="create-gist-error text-danger">{createGistError.message}</div>
            )}
            {createdGist && (
              <div className="text-success">Created gist with id {createdGist.id}</div>
            )}
          </div>
        </form>
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
)(CreateGist);
