import React, { useState, useEffect ,useRef} from 'react'
// import ReactDOM from 'react-dom';
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';

import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import '../static/css/AddArtcle.css';

import axios from 'axios';
import servicePath from '../../config/apiUrl';

import {debounce} from '../../utils/debounce' // 防抖函数

const { Option } = Select;
const { TextArea } = Input;

export default function AddArticle(props) {

  const debounceDelayTime = 800;
  const preContent = window.localStorage.getItem('ArticleContent');

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题

  const [articleContent, setArticleContent] = useState(preContent)  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('') //html内容(预览内容)
  
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('article introduce') //简介的html内容

  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  
  //  console.log('window.localStorage.getItem/ArticleContent<<',articleContent);

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
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  /* 
  实现实时预览，作两个对应的方法，在onChange事件触发时执行就可以。
  方法体也只是用marked进行简单的转换，当然对应的CSS是对应好的。
  */
  const changeContent = (e) => {
     console.log('ArticleContent'+(new Date()).getTime());
    window.localStorage.setItem('ArticleContent',e.target.value || 'nothing')
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
     console.log('我的防抖技术你真的用了吗！！！用了个寂寞，你压根就没吊用我');
    // debounce(()=> setMarkdownContent(html),debounceDelayTime)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }


  const refHtml = useRef("refHtml");
  const refMarkdown = useRef('refMarkdown')
/* 
  const [isLinkage, setIsLinkage] = useState(true); // 是否添加联动

  const refHtml = useRef();
  const refMarkdown = useRef()
  // const [isLinkage, setIsLinkage] = useState(true); // 是否添加联动
/* 
  const linkage = (isLinkage) => { //实现联动的添加和取消
    console.log('object');
    if (isLinkage) {
      console.log('refHtml.current<<<',refHtml);
      ReactDOM.findDOMNode(refHtml.current).addEventListener('scroll', () => {
        let top = this.scrollTop;
        let left = this.scrollLeft;
        ReactDOM.findDOMNode(refMarkdown.current).scrollTo(left,top)
      })
      ReactDOM.findDOMNode(refMarkdown.current).addEventListener('scroll', () => {
        let top = this.scrollTop;
        let left = this.scrollLeft;
        ReactDOM.findDOMNode(refHtml.current).scrollTo(left,top)
      })

      // let domMarkdown = document.querySelector('markdown-content')
      // let domHtml = document.querySelector('show-html')
      // domMarkdown.addEventListener('scroll', () => {
      //   let top = this.scrollTop;
      //   let left = this.scrollLeft;
      //   domHtml.scrollTo(left,top)
      // })
      // domHtml.addEventListener('scroll', () => {
      //   let top = this.scrollTop;
      //   let left = this.scrollLeft;
      //   domMarkdown.scrollTo(left,top)
      // })
    } else { // 取消联动
      
    }
  }

  useEffect(() => {
    linkage();
    return () => {
      setIsLinkage(false)
      linkage(isLinkage)
    };
  }, []);
 */
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
    return () => {
      
    }
  }, []);

  // useEffect(() => {
  //   setIsLinkage(true)
  //   linkage(isLinkage);
  //   return () => {
  //     setIsLinkage(false)
  //     linkage(isLinkage);
  //   };
  // }, [isLinkage]);

  // 保存文章的验证
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
    message.success('your article is valid');

    // 这里可以优化，不应该让一个对象反复的添加对象
    let dataProps = {}   //传递到接口的参数
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000;
    // dataProps.part_count = partCount
    // dataProps.article_content_html = markdownContent
    // dataProps.introduce_html = introducehtml

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
          setArticleId(insertId);
          const save_arti_data = res.data;
           console.log('/AddArticle/saveArticle/save_arti_data---:,', save_arti_data);
          if (res.data.isSuccess) {
            message.success('arti_save_successfully');
          } else {
            message.error('failed_save_article');
          }
        }
      )
    } else {
      const artiId = (new Date().getTime()) / 1000 + 12;
      setArticleId(artiId)
      dataProps.articleId = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.isScuccess) {
            message.success('文章保存成功')
          } else {
             message.error('保存失败');
          }
        }
      )
    }
    // 文章发布之后的操作
  }


  // getArticleById
  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        //let articleInfo= res.data.data[0]
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)

        setIntroducemd(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].typeId)

      }
    )
  }
  useEffect(() => {
    getTypeInfo()
    //获得文章ID
    let tmpId = props.match.params.id
    console.log('/pages/AddArticle/tmpId', tmpId);
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, [])

  const width_left_and_right = 24;

  return (
    <>
      <Row gutter={2}>
        {/* 两个主要的显示区域 */}
        <Col span={width_left_and_right}>
          {/* 左边的文章编写部分 */}
          <Row gutter={14} >
            {/* 文章标题 */}
            <Col span={20}>
              <Input
                placeholder="arti-Title"
                size="large"
                value={articleTitle}
                onChange={e => {
                  setArticleTitle(e.target.value)
                }}
              />
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
                ref={refMarkdown}
                className="markdown-content"
                rows={35}
                placeholder="arti-content"
                onChange={debounce(changeContent,debounceDelayTime)} // 选择的debounce是立即执行函数
                // onChange={(e)=>debounce(()=>changeContent,debounceDelayTime)}    // 使用闭包机制实现
                // onChange={changeContent}
                // onScroll={linkage}
              />

            </Col>
            {/* 使用marked转换文章后的预览部分 */}
            <Col span={12}>
              <div
                ref={refHtml}
                className="show-html"
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
    dangerouslySetInnerHTML={{__html: introducehtml}}
    />
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
