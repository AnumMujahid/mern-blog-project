import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Blog extends Component {
  render() {
    const blog = this.props.blog;
    return (
      <div>
        <h2>
          <Link to={`/show-blog/${blog._id}`}>{blog.title}</Link>
        </h2>
        <h4>{blog.created}</h4>
        <img src={blog.image} alt={blog.title} />
        <p>{blog.body}</p>
      </div>
    );
  }
}

export default Blog;
