import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { PlusOutlined } from '@ant-design/icons';
import SimpleButton from '../../components/AddButton';
import InputCard from '../../components/InputCard';
import Column from '../../components/Column';
import BoardHeader from '../../components/BoardHeader';
import './board.scss';

const Board: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [counter, setCounter] = useState(0);

  return (
    <>
      <BoardHeader />
      <div className="boardBody">
        <Collapse isOpened={!open}>
          <SimpleButton action={() => setCounter(!open)} title="Добавить список" icon={<PlusOutlined />} />
        </Collapse>
        <Collapse isOpened={open}>
          <InputCard />
          <Column />
        </Collapse>
        <SimpleButton action={() => setOpen(!open)} title="Добавить список" icon={<PlusOutlined />} />
      </div>
    </>
  );
};

export default Board;
