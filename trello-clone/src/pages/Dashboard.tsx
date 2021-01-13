import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import SimpleButton from '../components/AddButton';
import SimpleInput from '../components/Input';
// import ModalDialog from '../components/Modal'

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const history = useHistory();

  return (
    <>
      <h4>Доски</h4>
      <SimpleButton action={showModal} title="Создать доску" icon={<PlusOutlined />} />
      <Modal title="Новая доска" visible={isModalVisible} onOk={() => history.push('/board')} onCancel={handleCancel}>
        <SimpleInput placeholder="Добавить название доски" />
      </Modal>
    </>
  );
};

export default Dashboard;
