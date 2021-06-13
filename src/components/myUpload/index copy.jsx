import React from 'react'

import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function MyUpload() {

  const HandleFile = (file) => {
    console.log('HandleFile-----:', file);
    fetch(file)
      .then(response => {
        console.log('response.text()', response.text);
        return response.text();
      })
      .then(text => {
        // this.setState({
        //   markdown: marked(text)
        // })
        console.log('text-------------:', text);
      })
  }
  

  const getTextInfo = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (result) => {
      let targetNum = result.target.result;
      targetNum = targetNum.replace(/[\n\r]/g, '');//对获取的内容进行修改
      targetNum = targetNum.replace(/[ ]/g, '');//对获取内容进行修改
      this.props.dispatch({
        type: 'model/save',
        payload: targetNum,
      })

    }
    
    return false;
  }

  return (
    <>
      <Upload
        action="" accept="md" beforeUpload={getTextInfo}
        showUploadList={false}
        // directory
        // accept=".md"
      >
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>
    </>
  )
}
