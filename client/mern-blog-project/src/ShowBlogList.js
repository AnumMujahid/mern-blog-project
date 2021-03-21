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
      blogList = 'there are no blogs!';
    } else {
      blogList = blogs.map((blog, k) => <Blog blog={blog} key={k} />);
    }
    return (
      <div>
        <h2>Blog List</h2>
        <Link to="/create-blog">Add New Blog</Link>
        {blogList}
      </div>
    );
  }
}

export default ShowBlogList;
