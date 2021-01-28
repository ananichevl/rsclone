import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Card, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import SimpleInput from '../../components/simpleInput/SimpleInput';
import createSelectBoardAction from '../../store/actions/selectBoard';
import { IState } from '../../store/rootReducer';
import { createBoard, getBoards } from '../../service/Service';
import { BoardModel } from '../board/Board';
import './dashboard.scss';
import createCreateBoardAction from '../../store/actions/createBoard';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const boardName = useSelector<IState, string>((state) => state.board.title);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [boards, setBoards] = useState<BoardModel[]>([]);
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
      if (loadedBoards.status && (loadedBoards.status === 401 || loadedBoards.status === 403)) {
        history.push('/login');
      }
      setBoards(loadedBoards);
    };
    loadBoards();
  }, []);

  const handleOk = async () => {
    const board = await createBoard(boardName);
    if (board.status && (board.status === 401 || board.status === 403)) {
      history.push('/login');
    }
    dispatch(createCreateBoardAction(board));
    history.push(`board/${board.id}`);
  };

  const { t } = useTranslation();

  const boardCards = boards.map((board) => (
    <Card
      className="board"
      onClick={() => history.push(`board/${board.id}`)}
      hoverable
    >
      <div>
        {board.title}
      </div>
    </Card>
  ));

  return (
    <>
      <h4>{t('boards')}</h4>
      <div className="boards-container">
        {boardCards}
        <Card className="create-board-btn" onClick={showModal} hoverable>
          <PlusOutlined className="icon" />
          {t('create_board')}
        </Card>
      </div>
      <Modal
        title={t('new_board')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('modal_cancel_btn')}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {t('modal_create_btn')}
          </Button>,
        ]}
      >
        <SimpleInput
          onChange={(value) => dispatch(createSelectBoardAction(value))}
          placeholder={t('placeholder_add_title')}
        />
      </Modal>
    </>
  );
};

export default Dashboard;
