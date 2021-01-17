import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import SimpleButton from '../components/SimpleButton';
import SimpleInput from '../components/SimpleInput';
import createSelectBoardAction from '../store/actions/selectBoard';
import { IState } from '../store/rootReducer';

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [boardName, setBoardName] = useState<string>('');
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
    const createBoard = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
          title: boardName,
          columns: [
            {
              title: 'test',
              order: 0,
            },
          ],
        }),
      };

      try {
        const fetchResponse = await fetch('https://trello-clone-bh.herokuapp.com/boards', requestOptions);
        return await fetchResponse.json();
      } catch (e) {
        return e;
      }
    };

    const response = await createBoard();
    history.push(`board/${response.id}`);
  };

  return (
    <>
      <h4>Доски</h4>
      <SimpleButton action={showModal} title="Создать доску" icon={<PlusOutlined />} />
      <Modal
        title="Новая доска"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SimpleInput onChange={(value) => dispatch(createSelectBoardAction(value))} placeholder="Добавить название доски" />
      </Modal>
    </>
  );
};

export default Dashboard;
