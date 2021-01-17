import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import SimpleInput from '../../components/simpleInput/SimpleInput';
import createSelectBoardAction from '../../store/actions/selectBoard';
import { IState } from '../../store/rootReducer';
import createBoard from '../../service/Service';

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    dispatch(createSelectBoardAction(''));
    setIsModalVisible(false);
  };

  const history = useHistory();

  const boardName = useSelector<IState, string>((state) => state.selectedBoardName);

  const handleOk = async () => {
    const board = await createBoard(boardName);
    history.push(`board/${board.id}`);
  };

  return (
    <>
      <h4>Доски</h4>
      <Button onClick={showModal} icon={<PlusOutlined />}>Создать доску</Button>
      <Modal
        title="Новая доска"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SimpleInput
          onChange={(value) => dispatch(createSelectBoardAction(value))}
          placeholder="Добавить название доски"
        />
      </Modal>
    </>
  );
};

export default Dashboard;
