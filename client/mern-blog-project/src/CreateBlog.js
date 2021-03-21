import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class CreateBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: '',
      body: '',
      created: '',
    };
  }

  onHandleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onHandleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      title: this.state.title,
      image: this.state.image,
      body: this.state.body,
      created: this.state.created,
    };
    axios
      .post('http://localhost:5000/blogs', data)
      .then((res) => {
        this.setState({
          title: '',
          image: '',
          body: '',
          created: '',
        });
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log('Error in create blog');
      });
  };

  render() {
    return (
      <div>
        <Link to="/">Show Blogs</Link>
        <h1>Add Blog</h1>
        <p>Create New Blog</p>
        <form noValidate onSubmit={this.onHandleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="title of blog"
            name="title"
            value={this.state.title}
            onChange={this.onHandleChange}
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            placeholder="image for blog"
            name="image"
            value={this.state.image}
            onChange={this.onHandleChange}
          />
          <label htmlFor="body">Body</label>
          <input
            type="text"
            placeholder="body of blog"
            name="body"
            value={this.state.body}
            onChange={this.onHandleChange}
          />
          <label htmlFor="created">Date</label>
          <input
            type="date"
            placeholder="publish date"
            name="created"
            value={this.state.created}
            onChange={this.onHandleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default CreateBlog;
