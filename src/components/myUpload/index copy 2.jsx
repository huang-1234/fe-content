import React, { useState} from 'react'

import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function MyUpload() {

  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);

  const changeName = (e) => {
    this.setState({ name: e.target.value })
  }
  const changePath = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    let src, preview, type = file.type;

    // 匹配类型为image/开头的字符串
    if (/^image\/\S+$/.test(type)) {
      src = URL.createObjectURL(file)
      preview = <img src={src} alt='' />
    }
    // 匹配类型为video/开头的字符串
    else if (/^video\/\S+$/.test(type)) {
      src = URL.createObjectURL(file)
      preview = <video src={src} autoPlay loop controls />
    }
    // 匹配类型为text/开头的字符串
    else if (/^text\/\S+$/.test(type)) {
      const self = this;
      const reader = new FileReader();
      reader.readAsText(file);
      //注：onload是异步函数，此处需独立处理
      reader.onload = function (e) {
        preview = <textarea value={this.result} readOnly></textarea>
        self.setState({ path: file.name, data: file, preview: preview })
      }
      return;
    }

    this.setState({ path: file.name, data: file, preview: preview })
  }

  const upload = ()=>{
    const data = this.state.data;
    if (!data) {
      console.log('未选择文件');
      return;
    }

    //此处的url应该是服务端提供的上传文件api 
    const url = 'http://localhost:3000/api/upload';
    const form = new FormData();

    //此处的file字段由上传的api决定，可以是其它值
    form.append('file', data);

    fetch(url, {
      method: 'POST',
      body: form
    }).then(res => {
      console.log(res)
    })
  }
  const cancel = ()=>{
    this.props.closeOverlay();
  }
  return (
    <>
      <div>
        <h4>上传文件</h4>
        <div className='row'>
          <label>文件名称</label>
          <input type='text' placeholder='请输入文件名' value={name} onChange={changeName} />
        </div>
        <div className='row'>
          <label>文件路径</label>
          <div className='row-input'>
            <span>{path ? path : '请选择文件路径'}</span>
            <input type='file'
              // accept='video/*,image/*,text/plain'
              accept='.md'
              onChange={changePath} />
          </div>
        </div>
        <div className='media'>
          {preview}
        </div>
        <button className='primary upload' onClick={upload}>上传</button>
        <button className='primary cancel' onClick={cancel}>取消</button>
      </div>
    </>
  )
}
