import React, { useState, useEffect } from 'react';
// import '../static/css/ArticleList.css';
import {
  List, Space,
  // Modal, message, Button, Skeleton,
} from 'antd';
import { StarOutlined, LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'

// import Link from 'next/link';

export default function ShowArticleList({ ArticleList }) {
  const [artiList, setArtiList] = useState(ArticleList);

  useEffect(() => {
    console.log('这里的getArticleList是通过useEffect吊用的');
    console.log('ArticleList', ArticleList);
    setArtiList(ArticleList)
  }, [ArticleList]);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  /*   // mock数据
    const listData = [];
    for (let i = 0;i < 5;i++) {
      listData.push({
        href: 'https://huang-1234.github.io/',
        title: `ant design part ${i}`,
        star: 15,
        addTime: '20210520',
        view_count: 10086,
        typeName: 'js'
      });
    } */

  // const tagsNodes =
  return (
    <>

      <List
        itemLayout="vertical"
        bordered
        dataSource={artiList}
        // loadMore={<Skeleton />}
        renderItem={(item) => {
          return (
            <List.Item
              key={item.title}
              actions={[
                // <IconText icon={ClockCircleOutlined} text={item.addTime} key="list-vertical-addTime-o" />,
                <IconText icon={StarOutlined} text={item.star} key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                <IconText icon={EyeOutlined} text={item.view_count} key="list-vertical-view_count" />,
              ]}
            >
              <div className="content-box">
                <div className="article-profile">
                  <div className="meta-container">
                    <span className="user-profile">
                      item.article_user |
                      {/* <a href="">{item.article_user}</a> */}
                    </span>

                    <span className="date">
                      | {item.addTime}
                    </span>
                  </div>

                  <div className="tags">
                    item.tags：人工智能
                    {
                      // item.article_tags.map((tag) => (<span className={tag}></span>))
                    }
                  </div>
                </div>
                <span className="span-title">
                  <a href={item.href}>
                    {item.title}
                  </a>
                </span>

                <br />

                <div className="main-box">
                  <span className="span-introduce">
                    <a href={item.href}>
                      {item.introduce}
                    </a>
                  </span>
                </div>
              </div>
            </List.Item>
          )
        }
        }
      />
    </>
  )
}




