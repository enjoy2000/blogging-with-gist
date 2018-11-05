import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';

export class GistListItem extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    gist: PropTypes.object.isRequired,
    detail: PropTypes.bool
  };

  static defaultProps = {
    detail: false
  }

  state = {
    gistContent: null,
    error: null,
    loading: true,
  }

  componentDidMount() {
    const { gist } = this.props
    const gistFiles = Object.keys(gist.files)

    // get first file only
    const gistContentUrl = gist.files[gistFiles[0]].raw_url

    axios.get(gistContentUrl).then(data => {
      if (typeof(data.data) !== 'string') {  // expect raw content only
        console.log(gistContentUrl)
        this.setState({
          error: 'Not a post',
          loading: false,
        })
        return
      }

      this.setState({
        gistContent: data.data,
        loading: false,
      })
    }).catch(error => {
      this.setState({
        error: error.data.message || 'Unknown error',
        loading: false,
      })
    })
  }

  render() {
    const { gist, detail } = this.props;
    return (
      <div className="blog-gist-list-item card">
        <div className="row no-gutters">
            <div className="col-auto">
              <img width="50" src={gist.owner.avatar_url} className="img-fluid" alt="" />
            </div>
            <div className="col">
              <div className="card-block px-2">
                {
                  !detail && (
                    <h4>{Object.keys(gist.files)[0].slice(0, -5)}</h4>
                  )
                }
                {
                  this.state.loadding && (
                    <div className="loading">Loading...</div>
                  )
                }
                {
                  this.state.error ? (
                    <div className="gist-loadding-error">
                      {this.state.error}
                    </div>
                  ) : (
                    <div className="gist-content">
                      {this.state.gistContent && renderHTML(this.state.gistContent)}
                    </div>
                  )
                }
              </div>
            </div>
        </div>
        <div className="card-footer w-100 text-muted">
          <span><i className="fa fa-calendar"></i> {gist.created_at} </span>

          {
            !detail && (
              <Link className="float-right" to={`/blog/${gist.id}`}>Comments</Link>
            )
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
)(GistListItem);
