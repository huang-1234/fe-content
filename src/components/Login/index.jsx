
import React, { useState} from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin } from 'antd';
import { KeyOutlined, UserOutlined} from '@ant-design/icons';

import '../static/css/Login.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function checkLogin() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }
  return (
    <div>
      <div className="login-div">
        <Spin tip="Loading" spinning={isLoading}>
          <Card title="jsHuang" bordered={true} style={{ width: 400 }}>
            <Input id="userName" size="large"
              placeholder="please input your username!"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              onChange={(e) => { setUserName(e.target.value) }}
            />
            <Input.Password
              id="password"
              size="large"
              placeholder="Enter your password"
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
    </div>
  )
}
export default Login