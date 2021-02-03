import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Modal, Card, Button, Spin,
} from 'antd';
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
  const [isLoaderVisible, setLoaderVisible] = useState(true);

  const showModal = () => {
    dispatch(createSelectBoardAction(''));
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
      setLoaderVisible(false);
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

  const boardCards = boards.map((board, index) => (
    <Card
      className="board"
      style={{ backgroundColor: index % 2 ? '#5D21D1' : '#FE7624' }}
      onClick={() => history.push(`board/${board.id}`)}
      hoverable
    >
      <div>
        <h3 className="board-title-card">{board.title}</h3>
      </div>
    </Card>
  ));

  return (
    <div className="dashboard-wrapper">
      <h1 className="dashboard-title">{t('boards')}</h1>
      <div className="loader" style={{ display: isLoaderVisible ? 'flex' : 'none' }}>
        <Spin size="large" />
      </div>
      <div className="boards-container" style={{ display: isLoaderVisible ? 'none' : 'flex' }}>
        <Card className="create-board-btn" onClick={showModal} hoverable>
          <PlusOutlined className="icon" style={{ fontSize: '7.9rem', color: '#fff' }} />
        </Card>
        {boardCards}
      </div>
      <Modal
        centered
        title={t('new_board')}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className="modal-cancel-btn" key="back" onClick={handleCancel}>
            {t('modal_cancel_btn')}
          </Button>,
          <Button disabled={boardName === ''} className="modal-submit-btn" key="submit" type="primary" onClick={handleOk}>
            {t('modal_create_btn')}
          </Button>,
        ]}
      >
        <SimpleInput
          onChange={(value) => dispatch(createSelectBoardAction(value))}
          placeholder={t('placeholder_add_title')}
          onPressEnter={(value) => {
            if (value) {
              dispatch(createSelectBoardAction(value));
              handleOk();
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
