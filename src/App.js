import { Tag } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import {
  HomeOutlined,
} from '@ant-design/icons';
import { Fragment } from 'react';
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Login from './components/Login';
import AdminIndex from './pages/AdminIndex';

function App() {
  return (
    <Fragment key="App">
      <BrowserRouter>
        <Route path="/login/" exact component={Login} />
        <Route path="/creator/" component={AdminIndex} />
        <Redirect to="/login/" component={AdminIndex} />
      </BrowserRouter>
      <Footer style={{ textAlign: 'center' }}>
        <Tag icon={<HomeOutlined />} color="#cd201f">
          <a href="https://huang-1234.github.io/" rel='noreferrer' key='https://huang-1234.github.io' target='_blank'>https://huang-1234.github.io</a>
        </Tag>
      </Footer>
    </Fragment>
  );
}

export default App;
