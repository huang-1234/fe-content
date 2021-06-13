
import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
// import axios  from 'axios';

import { Row, Col, List } from 'antd';
import { CalendarOutlined, FolderOpenOutlined, FireOutlined} from '@ant-design/icons';

import Author from '../../components/Author/Author';
// import Advert from '../../components/Advert/Advert.js';
// import Footer from '../../components/Footer/Footer';
// import GetArticleList from '../../components/ArticleList/index'
// import ArticleDetail from '../../components/Article/Article.js'

// 这些都是解析Markdown必须的模块和CSS样式。
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import './articleDetail.css';

// 
// import { getArtListData } from './service.js';
// mock数据
import {articleList} from './mock.js'
export default function articleDetail(props){
  // console.log(props);
  // const artListData = getArtListData() //list of articleDetail: Promise {<pending>}
  const artListData = articleList.data;
   console.log('list of articleDetail:', artListData);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [artiList, setArtiList] = useState();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setArtiList(artListData);
  },[])

  // const [item1, item2] = artiList;
  //  console.log('pages/raticles/articleDetail/artiList---:', item1.articleId, item1.title, item2.articleId, item2.title);

  // 之后可以对marked进行setOptions设置，代码如下：
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }

  });

  return (
    <>
      <div>
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
              <div className="bread-div">

              </div>
            {/* <GetArticleList ArticleList={artiList }/> */}

            <List
              itemLayout="vertical"
              dataSource={artiList}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/articles/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span icon={<CalendarOutlined />}>{item.addTime}</span>
                    <span icon={<FolderOpenOutlined />}> {item.typeName}</span>
                    <span icon={<FireOutlined />}> {item.view_count}人</span>
                  </div>
                  <div className="posts_introduce"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  >
                  </div>
                  <div className="posts_content"
                    dangerouslySetInnerHTML={{ __html: marked(item.article_content) }}
                  >
                  </div>
                  {/* <ArticleDetail /> */}
                </List.Item>
              )}
            />
          </Col>

          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            {/* <Advert /> */}
          </Col>
        </Row>
      </div>
    </>
  )
}