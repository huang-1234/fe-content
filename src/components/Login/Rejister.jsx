import React, { useState }from 'react';
import { Modal, Button } from 'antd';

function Rejister() {

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true)
  }
  const handleOk = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      setVisible(false)
    }, 3000);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" onClick={showModal}>
        Sign in
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

export default Rejister;
