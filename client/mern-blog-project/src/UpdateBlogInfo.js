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
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Blog List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Blog</h1>
              <p className="lead text-center">Update Blog's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
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
              <br />

              <div className="form-group">
                <label htmlFor="body">Body</label>
                <input
                  type="text"
                  placeholder="Body"
                  name="body"
                  className="form-control"
                  value={this.state.body}
                  onChange={this.onHandleChange}
                />
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
                  type="text"
                  placeholder="Date"
                  name="created"
                  className="form-control"
                  value={this.state.created}
                  onChange={this.onHandleChange}
                />
              </div>
              <input
                type="submit"
                value="Update Blog"
                className="btn btn-outline-info btn-lg btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateBlogInfo;
