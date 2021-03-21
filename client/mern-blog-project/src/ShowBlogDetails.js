import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ShowBlogsDetail.css';

export class ShowBlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/blogs/' + this.props.match.params.id)
      .then((res) => {
        this.setState({ blog: res.data.blog });
      })

      .catch((err) => {
        console.log('Error from show blog details');
      });
  }
  onDeleteClick(id) {
    axios
      .delete('http://localhost:5000/blogs/' + id)
      .then((res) => {
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log('Error from Delete blog');
      });
  }
  render() {
    const blog = this.state.blog;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Blog
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/create-blog" className="nav-link">
                    Add New Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1 className="my-4 text-center">{blog.title}</h1>
          <hr className="blog__hr" />
          <img src={blog.image} alt={blog.title} className="blog__image" />
          <br />
          <p>
            Published On: {blog.created ? blog.created.substring(0, 10) : null}
          </p>
          <p>{blog.body}</p>
        </div>
        <br />
        <div className="container">
          <div className="row">
            <Link to={`/edit-blog/${blog._id}`} className="btn btn-dark mx-3">
              Edit Blog
            </Link>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.onDeleteClick.bind(this, blog._id)}
            >
              Delete Blog
            </button>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}

export default ShowBlogDetails;
