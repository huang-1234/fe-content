
import React, { useState, useEffect } from 'react';
import '../static/css/ArticleList.css';
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
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
  })

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

  //修改文章
  const updateArticle = (id, checked) => {
    console.log('updateArticle.id----------',id);
    props.history.push('/index/add/' + id)

  }
  

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            {/* 使用b标签加粗效果，下面的span一共加以来等于24，就是格栅化 */}
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            {/* <Col span={3}>
              <b>集数</b>
            </Col> */}
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={3}>
                {item.typeName}
              </Col>
              <Col span={3}>
                {item.addTime}
              </Col>
              {/* <Col span={3}>
                共<span>{item.part_count}</span>集
              </Col> */}
              <Col span={3}>
                {item.view_count}
              </Col>
              <Col span={4}>
                <Button type="primary" onClick={updateArticle} >修改</Button>&nbsp;
                <Button onClick={() => { delArticle(item.id) }} >删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  )

}

export default ArticleList
