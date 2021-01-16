import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import SimpleButton from '../components/SimpleButton';
import SimpleInput from '../components/SimpleInput';
// import ModalDialog from '../components/Modal'

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setColumnName] = useState<string>('');

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
        <SimpleInput setColumnHeader={() => console.log(setColumnName)} placeholder="Добавить название доски" />
      </Modal>
    </>
  );
};

export default Dashboard;
