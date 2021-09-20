import React, { useState, useEffect } from 'react';
import {
  Row, Col
  , message
} from 'antd';
// import servicePath from '../../config/apiUrl';
import axios from 'axios'

import Header from '../../components/Header/Header.jsx';
import ShowArticleList from '../../components/home/ArticleList';
import Author from '../../components/Author/Author.jsx'
import './index.css'

// import { articleList } from './mock.js';
// import { getArticleListApi } from '../../api/articleListApi.js'

const MainPage = (props) => {
  // const listData = articleList.data;

  const [list, setList] = useState();
  useEffect(() => {
    getArticleList()
  }, [])


  async function getArticleList() {
    const articleList = await new Promise(resolve => {
      axios.get(`http://127.0.0.1:8001/admin/getArticleList`)
        .then(
          (res) => { resolve(res.data) },
          (err) => message(err.message)
        )
    })
    setList(articleList.list)
  }

  return (
    <>
      <Header />
      <Row className="timeline_content" type="flex" justify="center" gutter={4} >
        <Col className="comm-right" xs={0} sm={0} md={8} lg={4} xl={4}>
          <Author />
        </Col>
        <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={16}>
          <ShowArticleList ArticleList={list} />
        </Col>
      </Row>
    </>
  );
}

export default MainPage;

