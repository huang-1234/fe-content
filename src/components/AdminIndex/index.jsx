import React, { useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileAddOutlined,
  VideoCameraOutlined,
  // UploadOutlined,
} from '@ant-design/icons';
import AddArticle from '../../pages/AddArticle';
import { Route, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex() {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1"
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
              key="sub1"
              icon={< VideoCameraOutlined />}
              title={
                <span>
                  <span>arti-mng</span>
                </span>
              }
            >
              <Menu.Item key="3">add-arti</Menu.Item>
              <Menu.Item key="4">arti-list</Menu.Item>

            </SubMenu>

            <Menu.Item key="9"
              icon={<FileAddOutlined />}
            >
              <span>msg-mng</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>backstage-pupporter</Breadcrumb.Item>
              <Breadcrumb.Item>workplace</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
{/*               <div id="Link">
                <Link to="/index/">
                  <a>blog-workplace.</a>
                </Link>
              </div> */}
              <div>
                <Route path="/index/" component={AddArticle} />
              </div>
            </div>
          </Content>

          <Footer style={{ textAlign: 'center' }}>https://huang-1234.github.io/</Footer>
        </Layout>
      </Layout>
    </>
  )
}
