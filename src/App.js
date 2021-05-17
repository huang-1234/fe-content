import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import AdminIndex from './pages/AdminIndex';
import ArticleList from './pages/ArticleList';
// import Main from './pages/Main'

function App() {
  return (
    <Fragment key="App">
      <BrowserRouter>
        <Route path="/login/" exact component={Login} />
        <Route path="/index/" component={AdminIndex} />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
