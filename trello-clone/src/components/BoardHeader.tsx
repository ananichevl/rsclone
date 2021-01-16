import React from 'react';
import '../pages/board/board.scss';

const BoardHeader: React.FC = () => (
  <div className="boardHeader">
    <span className="title" contentEditable="true">
      Новая доска
    </span>
  </div>
);

export default BoardHeader;
