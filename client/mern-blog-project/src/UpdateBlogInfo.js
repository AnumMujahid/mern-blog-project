import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class UpdateBlogInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      image: '',
      created: '',
    };
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/blogs/' + this.props.match.params.id)
      .then((res) => {
        this.setState({
          title: res.data.blog.title,
          body: res.data.blog.body,
          image: res.data.blog.image,
          created: res.data.blog.created,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateBlogInfo');
      });
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
      .put('http://localhost:5000/blogs/' + this.props.match.params.id, data)
      .then((res) => {
        this.props.history.push('/show-blog/' + this.props.match.params.id);
      })
      .catch((err) => {
        console.log('Error in UpdateBlogInfo!');
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
          <h1 className="my-4">Edit {this.state.title}</h1>
          <form noValidate onSubmit={this.onHandleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Title of the Blog"
                name="title"
                className="form-control"
                value={this.state.title}
                onChange={this.onHandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                cols="30"
                rows="10"
                className="form-control"
                value={this.state.body}
                onChange={this.onHandleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                placeholder="Image"
                name="image"
                className="form-control"
                value={this.state.image}
                onChange={this.onHandleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="created">Date</label>
              <input
                type="date"
                placeholder="Date"
                name="created"
                className="form-control"
                value={this.state.created}
                onChange={this.onHandleChange}
              />
            </div>
            <input
              type="submit"
              value="Edit Blog"
              className="btn btn-dark my-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateBlogInfo;
