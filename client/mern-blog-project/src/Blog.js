import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

export class Blog extends Component {
  render() {
    const blog = this.props.blog;
    return (
      <div>
        <div className="blog__border">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <img src={blog.image} alt={blog.title} className="blog__img" />
            </div>
            <div className="col-12 col-md-6 col-lg-8">
              <h2>{blog.title.toUpperCase()}</h2>
              <p>Published On: {blog.created.substring(0,10)}</p>
              <p>{blog.body.substring(0, 150) + '...'}</p>
              <br/>
              <Link
                to={`/show-blog/${blog._id}`}
                className="btn btn-dark"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
