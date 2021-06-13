
import { Fragment,Lazy,Suspense } from 'react';

import { Tag } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { HomeOutlined, } from '@ant-design/icons';
import {
  BrowserRouter, Route,
  Redirect
} from 'react-router-dom';

import Login from './components/Login'
import MainPage from './pages/main/index'
import AdminIndex from './pages/AdminIndex'

// const Login = Lazy(()=> import('./components/Login'))
// const MainPage = Lazy(()=> import('./pages/main/index'))
// const AdminIndex = Lazy(() => import('./pages/AdminIndex'))

// const MyUpload = Lazy(()=> import('./components/myUpload'))

/* In a development server, using for example webpack-dev-server, you have to use:
const Login = lazy(() => import('./components/navigation/LoginContainer'));
...
<Route name="login" exact path="/login" component={props => <Login {...props} />} />
...
and it will works also in a production environment. */

function App() {
  return (
    <Fragment key="App">
      <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
          <Route name="/login/"   path="/login/" exact component={Login} />
          <Route name="/"         path="/" exact component={MainPage} />
          <Route name="/creator"  path="/creator/" exact component={AdminIndex} />
          <Redirect to="/login/"                  component={Login} />
        </Suspense>
      </BrowserRouter>
      {/* <MyUpload></MyUpload>   */}

      <Footer style={{ textAlign: 'center' }}>
        <Tag icon={<HomeOutlined />} color="#cd201f">
          <a href="https://huang-1234.github.io/" rel='noreferrer' key='https://huang-1234.github.io' target='_blank'>https://huang-1234.github.io</a>
        </Tag>
      </Footer>
    </Fragment>
  );
}

export default App;
