

import {
  Avatar, Divider,
  // Tooltip
} from "antd";
// import { UserOutlined, AntDesignOutlined, WechatOutlined, LoadingOutlined, } from '@ant-design/icons';
import imgAuthor from '../../static/img/me.jpg'
// import { github, qq, wechat} from 'antd/dist/'
import './author.css';


const Author = () => {
  return (
    <>
      <div className="author-div comm-box">
        {/* <span>About Author</span> */}
        <div>
          <Avatar size={100} src={imgAuthor} target="_blank"/>
        </div>
        
        <div className="author-introduction">
          <Divider>Detail</Divider>

          {/* <Avatar size={38} icon={<UserOutlined />} className="account"
            style={{
              backgroundColor: '#f56a00',
            }}
          >HSQ</Avatar> */}

        </div>
      </div>
    </>
  )
}
export default Author;