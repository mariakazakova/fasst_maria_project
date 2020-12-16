import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import { TortleForm } from './TortleForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

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

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const ElementToShow = ({ onClick }) => (
    props.tortue ?
      <FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer' }} className="float-right" onClick={onClick}/> :
      <Button type="primary" onClick={onClick}>
        Créer une tortue
      </Button>
  );



  return (
    <>
      <ElementToShow onClick={showModal}/>
      <Modal title={props.tortue ? 'Mise à jour de tortue' : 'Creation de tortue'} visible={isModalVisible} onOk={handleCloseModal} onCancel={handleCloseModal}>
        <TortleForm createTortue={props.createTortue} updateTortue={props.updateTortue} tortue={props.tortue} onCancel={handleCloseModal}/>
      </Modal>
    </>
  );

};

export default CreateTortleForm;

