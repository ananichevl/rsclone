import React from 'react';
import '../pages/board/board.scss';

interface IBoardHeaderProps {
  title: string
}

const BoardHeader: React.FC<IBoardHeaderProps> = ({ title }) => (
  <div className="boardHeader">
    <span className="title" contentEditable="true">
      {title}
    </span>
  </div>
);

export default BoardHeader;
