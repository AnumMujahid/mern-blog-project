import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Blog from './Blog';

export class ShowBlogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/blogs')
      .then((res) => {
        this.setState({
          blogs: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('Error from Show blogs list');
      });
  }
  render() {
    const blogs = this.state.blogs;
    let blogList;
    if (!blogs) {
      blogList = 'There are no blogs!';
    } else {
      blogList = blogs.map((blog, k) => <Blog blog={blog} key={k} />);
    }
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
          <h2 className="my-4">BLOG LIST</h2>
          {blogList}
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default ShowBlogList;
