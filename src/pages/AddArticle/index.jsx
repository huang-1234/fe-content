import React, { useState, useEffect } from 'react'
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import '../static/css/AddArtcle.css';

import axios from 'axios';
import servicePath from '../../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input;

export default function AddArticle(props) {


  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题

  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容

  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  // 声明完成后需要对marked进行基本的设置
  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  /* 
  实现实时预览非常简单，作两个对应的方法，在onChange事件触发时执行就可以。
  方法体也只是用marked进行简单的转换，当然对应的CSS是我们对应好的。
  */
  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  function publicArti(){
    return;
  }

  const width_left_and_right = 24;


  function getTypeInfo() {

    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      (res) => {
        if ('没有登录' === res.data.data) {
          localStorage.removeItem('openID');
          props.history.push('/login/');
        } else {
          setTypeInfo(res.data.data);
        }
      }
    )
  }
  // 只执行一次
  useEffect(() => {
    getTypeInfo();
  }, []);

  // 保存文章的印证
  function saveArticle() {
    // markedContent();  //先进行转换
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    message.success('检验通过');

    // 这里可以优化，不应该让一个对象反复的添加对象
    let dataProps = {}   //传递到接口的参数
    
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000;
    

    if (0===articleId) {
      console.log('pages/AddArticle/index.jsx--articleId=:' + articleId);
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      dataProps.articleId = (new Date().getTime()) / 1000 + 12;

      // addArticle POST请求
      console.log('/pages/AddArticle/index.jsx---dataProps.articleId,title:', dataProps.articleId, dataProps.title);
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          const insertId = res.data.insertId;
          console.log('/pages/AddArticle/index.jsx---insertId', insertId);
          setArticleId(insertId)
          if (res.data.isScuccess) {
            message.success('arti_save_successfully')
          } else {
            message.error('failed_save_arti');
          }
        }
      )
    } else {
      // dataProps
    }
  }


  return (
    <>
      <Row gutter={5}>
        {/* 两个主要的显示区域 */}
        <Col span={width_left_and_right}>
          {/* 左边的文章编写部分 */}
          <Row gutter={14} >
            {/* 文章标题 */}
            <Col span={20}>
              <Input
                placeholder="arti-Title"
                size="large" />
            </Col>
            {/* 选择 */}
            <Col span={4}>
              &nbsp;
              {/* 文章分类 */}
              <Select defaultValue={selectedType} size="large">
                {
                  typeInfo.map((item,index)=>{
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })

                }
                {/* <Option value="Sign Up">vidio</Option> */}
              </Select>
            </Col>
            {/* 文章暂存,发布功能部分 */}
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <Button size="large">草稿箱</Button>&nbsp;
                  <Button type="primary" size="large" onClick={saveArticle}>发布</Button>
                  <br />
                </Col>
              </Row>

            </Col>
          </Row>
          <br />
          {/* 中间的文章显示部分 */}
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="arti-content"
                onChange={changeContent}
              />

            </Col>
            {/* 使用marked转换文章后的预览部分 */}
            <Col span={12}>
              <div className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              >
              </div>
            </Col>
          </Row>
        </Col>
        
        {/* 标题对应的文本框 */}
        <Col span={16}>
          <Input
            value={articleTitle}
            placeholder="博客标题"
            onChange={e => {
              setArticleTitle(e.target.value)
            }}
            size="large" />
        </Col>
        {/* 文章简介部分 */}
        <Col span={width_left_and_right}>
          <TextArea rows={4}
            placeholder="arti-introduce"
            onChange={changeIntroduce}
          > </TextArea>
          <div className="introduce-html"
            dangerouslySetInnerHTML={{ __html: introducehtml}}
          ></div>
        </Col>
        {/* 文章发布时间 */}
        <Col span={12}>
          <div className="date-select">
            <DatePicker
              placeholder="发布日期"
              size="large"
              onChange={(date,dateString)=>setShowDate(dateString)}
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
