import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import ShowBlogList from './ShowBlogList';
import ShowBlogDetails from './ShowBlogDetails';
import UpdateBlogInfo from './UpdateBlogInfo';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={ShowBlogList} />
        <Route path="/create-blog" component={CreateBlog} />
        <Route path="/edit-blog/:id" component={UpdateBlogInfo} />
        <Route path="/show-blog/:id" component={ShowBlogDetails} />
      </div>
    </Router>
  );
}

export default App;
