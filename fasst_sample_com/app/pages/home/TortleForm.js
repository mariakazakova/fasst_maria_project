import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';

export const TortleForm = props => {
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    if(props.tortue){
      data.id = props.tortue._id;
      props.updateTortue(data);
    }
    else {
      props.createTortue(data);
    }
    props.onCancel();
  };

  const TextInput = ({ label, placeHolder = 'text', onChange, value }) => (
    <Form.Item
      label={label}>
      <Input
        type="text"
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
  );

  const SelectInput = ({ label, placeHolder = 'text', onChange, value }) => (
    <Select label={label} defaultValue={true} style={{ width: 120 }} onChange={onChange}>
      <Select.Option value={true}>Terrestre</Select.Option>
      <Select.Option value={false}>Aquatique</Select.Option>
    </Select>
  );


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue={props.tortue?props.tortue.name:""}
        rules={{
          required:  !props.tortue
        }}
        render={({ onChange, value }) => <TextInput label={'Nom'} onChange={onChange} value={value}/>}
      />

      <Controller
        name="age"
        control={control}
        defaultValue={props.tortue?props.tortue.age:""}
        rules={{
          required:  !props.tortue
        }}
        render={({ onChange, value }) => <TextInput label={'Age'} onChange={onChange} value={value}/>}
      />

      <Controller
        name="taille"
        control={control}
        defaultValue={props.tortue?props.tortue.taille:""}
        rules={{
          required:  !props.tortue
        }}
        render={({ onChange, value }) => <TextInput label={'Taille'} onChange={onChange} value={value}/>}
      />

      <Controller
        name="species"
        control={control}
        defaultValue={props.tortue?props.tortue.species:""}
        rules={{
          required: !props.tortue
        }}
        render={({ onChange, value }) => <TextInput label={'Espèce'} onChange={onChange} value={value}/>}
      />

      <Controller
        name="terrestre"
        control={control}
        defaultValue={props.tortue?props.tortue.terrestre:"false"}
        render={({ onChange, value }) => <SelectInput label={'Terrestre/Aquatique'} onChange={onChange} value={value}/>}
      />
      <br/>
      <br/>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};
