import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import QTortlesMutation from '../../_graphql/mutations/QAddTortle';
import { useForm, Controller } from "react-hook-form";
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
  const { handleSubmit, control} = useForm();
  const onSubmit = data => console.log("data ",data);

    const onCreateTortleHandler = () => {
      console.log("okokok");
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
        <Form
        {...layout}
        name="basic"
        //onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit(data => console.log(data))}
      >

          <Controller
            control={control}
            name="ReactDatepicker"
            as={<Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>}
          />
          
          <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
        </Form>

      </Modal>
    </>
  );

  }

export default CreateTortleForm; 

/*<Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Taille"
            name="taille"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout} name="terrestre" valuePropName="checked">
            <Checkbox>Terrestre</Checkbox>
          </Form.Item>

          <Form.Item
            label="Espèce"
            name="espèce"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >*/