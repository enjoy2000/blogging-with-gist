import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import GistListItem from './GistListItem'

export class GistList extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount () {
    console.log('did mount')
    if (this.props.blog.user) {
      // start to fetch gists if login
      this.props.actions.fetchGists()
    }
  }

  render() {
    // TODO component for every element
    return (
      <div className="blog-gist-list">
        <div className="cards">
        {
          this.props.blog.gists.map(gist => (
            <GistListItem key={gist.id} gist={gist} />
          ))
        }
        </div>
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
)(GistList);
