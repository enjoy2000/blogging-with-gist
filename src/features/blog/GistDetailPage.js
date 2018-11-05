import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import GistListItem from './GistListItem';
import GistComment from './GistComment';
import CreateComment from './CreateComment';

export class GistDetailPage extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const gistId = this.props.match.params.gist
    this.props.actions.fetchGist(gistId)
  }

  render() {
    const { gist } = this.props.blog
    return gist ? (
      <div className="blog-gist-detail-page">
        <h1>{Object.keys(gist.files)[0].slice(0, -5)}</h1>
        <p className="description text-muted">{gist.description}</p>

        <div className="content">
          <GistListItem gist={gist} detail />
        </div>

        <section className="comments">
          <h4>Comments</h4>
          {
            gist.comments > 0 ? (
              <GistComment commentsUrl={gist.comments_url} />
            ) : (
              <div className="no-comments text-danger">
                There are no comments on this blog
              </div>
            )
          }
          <CreateComment commentsUrl={gist.comments_url} />
        </section>
      </div>
    ) : (
      <div className="text-center loading">Loading...</div>
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
)(GistDetailPage);
