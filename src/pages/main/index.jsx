import React, { useState, useEffect } from 'react';
import {
  Row, Col
  // , message
} from 'antd';
// import servicePath from '../../config/apiUrl';

import Header from '../../components/Header/Header.jsx';
import GetArticleList from '../../components/home/ArticleList';
import Author from '../../components/Author/Author.jsx'
import './index.css'

// import { articleList } from './mock.js';
import {getArticleListApi} from '../../api/articleListApi.js'

const MainPage = (props) => {
  // const listData = articleList.data;

  const [list, setList] = useState();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getArticleList()
    // setList(articleList);
    // setList(listData);
  }, [])

  async function getArticleList(){
    const data = getArticleListApi();
    console.log('data<<',data)
    // if (res.statusCode !== 200) {
    //   message.error('获取getArticleList失败了')
    // }
    setList(data)
  }


  return (
    <>
      <Header />
      <Row className="timeline_content" type="flex" justify="center" gutter={4} >
        <Col  className="comm-right" xs={0} sm={0} md={8} lg={4} xl={4}>
          <Author />
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
          <GetArticleList ArticleList={list}/>
        </Col>

      </Row>
      
    </>
  );
}

export default MainPage;

