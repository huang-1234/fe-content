import React, {
  // useState,
  useRef
} from 'react'

// import { Button, Upload } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

export default function MyUpload() {

  // const [fileInput , setFileInput ] = useState();
  const fileInput = useRef()

  const upload = () => {
    const data = new FormData();
    console.log('fileInput-------:', fileInput);
    console.log('fileInput.current.files[0]-------:', fileInput.current.files[0]);
    data.append('file', fileInput.current.files[0]);  //相当于 input:file 中的name属性
    fetch('http://127.0.0.1:3001/file/upload', {
      method: 'POST',
      body: data
    }).then(response => console.log(response))
  };

  return (
    <>
      <div>
        <input type="file" name='file' ref={fileInput} />
        <input type="button" value="上传" onClick={upload} />
      </div>
    </>
  )
}
