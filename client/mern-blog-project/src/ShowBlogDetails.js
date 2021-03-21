import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    let BlogItem = (
      <div>
        <table>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Title</td>
              <td>{blog.title}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Image</td>
              <td>{blog.image}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Body</td>
              <td>{blog.body}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Date</td>
              <td>{blog.created}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Blog List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Blog's Record</h1>
              <p className="lead text-center">View Blog's Info</p>
              <hr /> <br />
            </div>
          </div>
          <div>{BlogItem}</div>

          <div className="row">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-outline-danger btn-lg btn-block"
                onClick={this.onDeleteClick.bind(this, blog._id)}
              >
                Delete Blog
              </button>
              <br />
            </div>

            <div className="col-md-6">
              <Link
                to={`/edit-blog/${blog._id}`}
                className="btn btn-outline-info btn-lg btn-block"
              >
                Edit Blog
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBlogDetails;
