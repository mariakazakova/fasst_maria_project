import React from 'react';
import { Form, Button, Input } from 'antd';
import { useForm, Controller } from 'react-hook-form';

export const SampleForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = data => { console.log(data); };

  const TextInput = (label, placeHolder = 'text') => (
    <Form.Item
      label={label}>
      <Input
        type="text"
        placeholder={placeHolder}
      />
    </Form.Item>
  );


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextInput('nom', 'name')}
        name="name"
        control={control}
        defaultValue=""
        rules={{
          required: true
        }}
      />

      <Button block type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};
