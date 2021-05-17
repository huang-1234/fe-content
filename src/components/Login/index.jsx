
import React, { useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { KeyOutlined, UserOutlined} from '@ant-design/icons';

import '../static/css/Login.css';

import axios from 'axios';
import servicePath from '../../config/apiUrl';
import { LOGIN_SUCCESSFULLY, LOGIN_FAILED} from './login_constant'

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息

  function checkLogin() {
    console.log('admin:username:',username,'password:',password);
    setIsLoading(true);

    if (!username) {
      message.error("username can't be enpty");
      setTimeout(() => {
        setIsLoading(false)
      },500)
      return false;
    } else if (!password) {
      message.error("password can't be enpty");
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      return false;
    }
    const dataProps = {
      'username': username,
      'password':password,
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials:true   //前后端是否共享session
    }).then(
      (res) => {
        console.log('res.data:', res.data);
        const loginStatus = res.data.data;
        setIsLoading(false);
        if (LOGIN_SUCCESSFULLY === loginStatus) {
          // 判断用户的账户密码是否在数据库当中，以及是否正确，正确，则跳转到登录后的首页，否则直接else报错
          // 使用window.localStorage
          // const lStorage = window.localStorage;
          // lStorage.setItem('openID', res.data.openID);
          // console.log("lStorage['openID']:", lStorage['openID']);

          // 使用window.sessionStorage
          const sStorage = window.sessionStorage;
          sStorage.setItem('openID', res.data.openID);
          console.log("sStorage['openID']:", sStorage['openID']);


          console.log(props.history);
          props.history.push('/index');
        } else if (LOGIN_FAILED === loginStatus) {
          // props.history.push('/login/');
          message.error('username or password was wrong');
        }
    })
  }

  return (
    <>
      <div className="login-div">
        <Spin tip="Loading" spinning={isLoading}>
          <Card title="jsHuang" bordered={true} style={{ width: 400 }}>
            <Input id="userName" size="large"
              placeholder="please input your username!"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <Input.Password
              id="password"
              size="large"
              placeholder="please input your password"
              prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <br /><br />
            <Button type="primary" size="large" block
              onClick={checkLogin}
            >
              Login in
            </Button>
          </Card>
        </Spin>
      </div>
    </>
  )
}
export default Login