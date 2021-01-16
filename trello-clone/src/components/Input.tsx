import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import createSelectBoardAction from '../store/actions/selectBoard';

interface IInputProps {
  placeholder: string,
  setColumnHeader: React.Dispatch<React.SetStateAction<string>> | any
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, setColumnHeader }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  // if (inputRef.current !== null) {
  //   inputRef.current.focus();
  // }

  useEffect(() => {
    if (value.length > 5) {
      console.log(value);
    }
  }, [value]);

  return (
    <div>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          if (setColumnHeader) {
            setColumnHeader(e.target.value);
          }
          dispatch(createSelectBoardAction(e.target.value));
        }}
        value={value}
      />
    </div>
  );
};

export default SimpleInput;
