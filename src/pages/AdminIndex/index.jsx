import React, { useState } from 'react'
import { BrowserRouter as Router,Route, Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileAddOutlined,
  VideoCameraOutlined,
  // UploadOutlined,
} from '@ant-design/icons';

import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const handleClickArticle = e => {
    console.log(e.item.props);
    // 这里的e.key一定要注意了，一定要和你写的那个点击的item的key相同
    if (e.key == 'add-arti') {
      console.log('/index/add');
      props.history.push('/index/add')
    } else if ('arti-list' === e.key) {
      console.log('/index/list/');
      props.history.push('/index/list/')
    }
  }

  
  return (
    <>
      <Layout style={{minHeight: '100vh',}}>
        <Sider collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{ background: '#7FFFD4', padding: 0 }}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="work-place"
              icon={< MenuUnfoldOutlined />}
            >
              <span>work-place</span>
            </Menu.Item>
            <Menu.Item key="2"
              icon={< MenuFoldOutlined />}
            >
              <span>add-arti</span>
            </Menu.Item>
            <SubMenu
              key="arti-mng"
              onClick={handleClickArticle}
              icon={< VideoCameraOutlined />}
              title={
                <span>
                  <span>arti-mng</span>
                </span>
              }
            >
              <Menu.Item key="add-arti">add-arti</Menu.Item>
              <Menu.Item key="arti-list">arti-list</Menu.Item>

            </SubMenu>

            <Menu.Item key="msg-mng"
              icon={<FileAddOutlined />}
            >
              <span>msg-mng</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'red', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>backstage-pupporter</Breadcrumb.Item>
              <Breadcrumb.Item>workplace</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/index/" exact component={AddArticle} />
                <Route path="/index/add/" exact  component={AddArticle} />
                <Route path="/index/add/:id" exact  component={AddArticle} />
                <Route path="/index/list/" exact component={ArticleList} />
              </div>
            </div>

          </Content>
          
          <Footer style={{ textAlign: 'center' }}>
            https://huang-1234.github.io/
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}
