
import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.css';
import {
  List, Space, Modal, message, Button,
} from 'antd';
import { ClockCircleOutlined, StarOutlined, LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import './ArticleList.css'

import axios from 'axios';
import servicePath from '../../config/apiUrl';

const { confirm } = Modal;


function ArticleList(props) {

  const [list, setList] = useState([])

  //得到文章列表
  const getArticleList = () => {

    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        // 这个请求是相当的频繁
        const ArtiList = res.data.list;
        console.log('ArtiList:', ArtiList);
        setList(res.data.list)
      }
    )
  }
  // 当我们进入页面的使用，就希望可以获得博客文章的列表，所以要使用useEffect()方法来进行操作
  useEffect(() => {
    console.log('这里的getArticleList是通过useEffect吊用的');
    getArticleList();
  }, [])

  //删除文章的方法
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success('文章删除成功');
            console.log('这里的getArticleList是通过delArticle吊用的');
            getArticleList();
          }
        )
      },
      onCancel() {
        message.success('没有任何改变')
      },
    });
  }


  const routerCreatorAdd = '/creator/add/?id='; // 在编写文章的地方修改某文章，需把该文章的id传过去，然后那边自己查询
  //修改文章，there is a bug, the function are exe for 7
  const updateArticle = (id, checked) => {
    console.log('updateArticle.id----------', id, checked);
    props.history.push(routerCreatorAdd + id)

  }

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
        typeName:'js'
      });
    }
     */
  return (
    <>
      <List
        itemLayout="vertical"
        bordered
        dataSource={list}
        // loadMore={<Skeleton />}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={ClockCircleOutlined} text={item.addTime} key="list-vertical-addTime-o" />,
              <IconText icon={StarOutlined} text={item.star} key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              <IconText icon={EyeOutlined} text={item.view_count} key="list-vertical-view_count" />,
            ]}
          >
            {/* <List.Item.Meta
              title={
                <a href={item.href}>
                  {item.title}
                </a>
              }
            /> */}

            <span id="articleList-span">
              <a href={item.href}>
                {item.title}
              </a>
              <span>
                <Button type="primary" onClick={() => { updateArticle(item.id) }} >修改</Button>
                <Button onClick={() => { delArticle(item.id) }} >删除 </Button>
              </span>
            </span>
          </List.Item>
        )}
      />
    </>
  )

}

export default ArticleList
