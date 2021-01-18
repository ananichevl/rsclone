import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Card, Button } from 'antd';
import SimpleInput from '../../components/simpleInput/SimpleInput';
import createSelectBoardAction from '../../store/actions/selectBoard';
import { IState } from '../../store/rootReducer';
import { createBoard, getBoards } from '../../service/Service';
import './dashboard.scss';

const Dashboard: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boards, setBoards] = useState([]);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    dispatch(createSelectBoardAction(''));
    setIsModalVisible(false);
  };

  useEffect(() => {
    const loadBoards = async () => {
      const loadedBoards = await getBoards();
      setBoards(loadedBoards);
    };
    loadBoards();
  }, []);

  const history = useHistory();

  const boardName = useSelector<IState, string>((state) => state.selectedBoardName);

  const handleOk = async () => {
    const board = await createBoard(boardName);
    history.push(`board/${board.id}`);
  };

  const boardCards = boards.map((board) => (
    <Card
      className="board"
      onClick={() => history.push(`board/${board.id}`)}
      hoverable
    >
      {board.title}
    </Card>
  ));

  return (
    <>
      <h4>Доски</h4>
      <div className="boards-container">
        {boardCards}
        <Card className="create-board-btn" onClick={showModal} hoverable>
          <PlusOutlined className="icon" />
          Создать доску
        </Card>
      </div>
      <Modal
        title="Новая доска"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Создать
          </Button>,
        ]}
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
