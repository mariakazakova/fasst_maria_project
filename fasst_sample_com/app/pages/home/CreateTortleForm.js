import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { TortleForm } from './TortleForm';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const CreateTortleForm = props => {

  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Créer une tortue
      </Button>
      <Modal title="Creation de tortue" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <TortleForm createTortue={props.createTortue} onCancel={handleCancel}/>
      </Modal>
    </>
  );

};

export default CreateTortleForm;

