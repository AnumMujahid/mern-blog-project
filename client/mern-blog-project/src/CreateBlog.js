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
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <h1 className="mt-4">ADD BLOG</h1>
          <p className="mb-4 lead">Create New Blog</p>
          <form noValidate onSubmit={this.onHandleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Enter title here"
                name="title"
                value={this.state.title}
                onChange={this.onHandleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                placeholder="Enter image URL here"
                name="image"
                value={this.state.image}
                onChange={this.onHandleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                placeholder="Enter blog body text here"
                cols="30"
                rows="10"
                className="form-control"
                value={this.state.body}
                onChange={this.onHandleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="created">Date</label>
              <input
                className="form-control"
                type="date"
                placeholder="Enter publish date here"
                name="created"
                value={this.state.created}
                onChange={this.onHandleChange}
              />
            </div>
            <br />
            <input type="submit" className="btn btn-dark" />
          </form>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default CreateBlog;
