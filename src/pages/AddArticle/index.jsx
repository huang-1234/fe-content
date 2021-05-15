import React, { useState } from 'react'
import marked from 'marked';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';

import '../static/css/AddArtcle.css';

const { Option } = Select;
const { TextArea } = Input;

export default function AddArticle() {


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

  return (
    <>
      <Row gutter={5}>
        
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
              <Select defaultValue="Sign Up" size="large">
                <Option value="Sign Up">vidio</Option>
              </Select>
            </Col>
            {/* 文章暂存,发布功能部分 */}
            <Col span={6}>
              <Row>
                <Col span={24}>
                  <Button size="large">草稿箱</Button>&nbsp;
                  <Button type="primary" size="large" onClick={publicArti}>发布</Button>
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
            />
          </div>
        </Col>
      </Row>
    </>
  )
}
