import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input } from 'antd';
import QTortlesMutation from '../../_graphql/mutations/QAddTortle';
import { useForm, Controller } from 'react-hook-form';
import { SampleForm } from './SampleForm';

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

const CreateTortleForm = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log('data ', data);

  const onCreateTortleHandler = () => {
    console.log('okokok',);
    QTortlesMutation({

    }, (hasError, data) => {
      // * Reaction a la mutation
    });
  };


  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    onCreateTortleHandler();
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
      <SampleForm/>
      </Modal>
    </>
  );

};

export default CreateTortleForm;

