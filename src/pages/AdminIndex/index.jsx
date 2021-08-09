import React, { useState } from 'react'
import {
  Route,
  // Link
} from 'react-router-dom';

import {
  Layout, Menu,
  // Breadcrumb
} from 'antd';
import {
  HomeOutlined,
  // MenuFoldOutlined,
  DatabaseOutlined,
  ProfileTwoTone,
  FlagOutlined,
  QuestionCircleTwoTone,
  // VideoCameraOutlined,
  // UploadOutlined,
} from '@ant-design/icons';

import Author from '../../components/Author/Author';

import ContentData from '../../components/creatorPage/DataCenter/ContentData';
import FollowerData from '../../components/creatorPage/DataCenter/FollowerData';

import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';
import CreatorHome from '../../components/creatorPage/CreatorHome';

// const Author = () => require('../../components/Author/Author')

const { Header, Content, Sider,
  // Footer
} = Layout;
const { SubMenu } = Menu;


export default function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  // const [path, setPath] = useState('initialState');
  // const [subpath, setSubpath] = useState('initialState');

  //
  const { _CreatorPaths } = require('../routers');
  const { e_key } = require('../routers')

  const gotoHome = (e) => {
    // console.log('/creator/home/');
    console.log(_CreatorPaths.home);
    props.history.push(_CreatorPaths.home)
  }

  const handleData = (e) => {
    // setPath()
    if (e_key.data_content === e.key) {
      console.log(_CreatorPaths.data_content);
      props.history.push(_CreatorPaths.data_content)
    } else if (e_key.data_follower === e.key) {
      console.log(_CreatorPaths.data_follower);
      props.history.push(_CreatorPaths.data_follower)
    } else {
      // console.log(_CreatorPaths.data_content);
      // props.history.push(_CreatorPaths.data_content)
    }
  }
  const handleClickArticle = e => {
    console.log('handleClickArticle.e-----------<<:', e);
    // 这里的e.key一定要注意了，一定要和你写的那个点击的item的key相同
    if (e_key.add_article === e.key) {
      console.log(_CreatorPaths.add + '<<');
      props.history.push(_CreatorPaths.add)
    } else if (e_key.article_list === e.key) {
      console.log(_CreatorPaths.article_essays + '<<');
      props.history.push(_CreatorPaths.article_essays)
    }
  }

  const handleActivity = (e) => {
    console.log('/creator/add');
  }

  const handleHelp = (e) => {
    console.log('/creator/add');
  }


  return (
    <>
      <Layout style={{ minHeight: '100vh', }}>
        <Sider collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          style={{ background: '#FFFFFF', padding: 0 }}
        >
          <Author />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="work-place" icon={<HomeOutlined />}
              onClick={gotoHome}
            >
              <span>首页</span>
            </Menu.Item>
            <SubMenu
              key={e_key.data_center}
              onClick={handleData}
              icon={<DatabaseOutlined />}
              title={<span>数据中心</span>}
            >
              <Menu.Item key={e_key.data_content}>
                <span>内容数据</span>
              </Menu.Item>
              <Menu.Item key={e_key.data_follower}>
                <span>关注者数据</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key={e_key.article_manage}
              onClick={handleClickArticle}
              icon={<ProfileTwoTone />}
              title={<span>内容管理</span>}
            >
              <Menu.Item key={e_key.add_article}>
                <span>编写文章</span>
              </Menu.Item>
              <Menu.Item key={e_key.article_list}>
                <span>文章管理</span>
              </Menu.Item>

            </SubMenu>

            <SubMenu
              key={e_key.activity}
              onClick={handleActivity}
              icon={<FlagOutlined />}
              title={<span>活动中心</span>}
            >
              <Menu.Item key={e_key.activity_apply}>
                <span>申请活动</span>
              </Menu.Item>
              <Menu.Item key={e_key.activity_manage}>
                <span>活动管理</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key={e_key.help}
              onClick={handleHelp}
              icon={<QuestionCircleTwoTone />}
              title={<span>帮助中心</span>}
            >
              <Menu.Item key={e_key.help_qustion}>
                <span>常见问题</span>
              </Menu.Item>
              <Menu.Item key={e_key.help_report}>
                <span>举报</span>
              </Menu.Item>

            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: 'red', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>backstage-pupporter</Breadcrumb.Item>
              <Breadcrumb.Item>workplace</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path="/creator/" exact component={AddArticle} />
                <Route path="/creator/add/" exact component={AddArticle} />
                <Route path="/creator/add/:id" exact component={AddArticle} />
                <Route path="/creator/content/article/essays" exact component={ArticleList} />

                <Route path="/creator/home/" exact component={CreatorHome} />

                {/* data-center */}
                <Route path="/creator/data/content" exact component={ContentData} />
                <Route path="/creator/data/follower" exact component={FollowerData} />
              </div>
            </div>

          </Content>
        </Layout>
      </Layout>
    </>
  )
}
