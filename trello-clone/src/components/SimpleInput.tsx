import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from 'antd';
import createSelectBoardAction from '../store/actions/selectBoard';

interface IInputProps {
  placeholder: string,
  setColumnHeader?: React.Dispatch<React.SetStateAction<string>> | any,
  // setBoardHeader?: React.Dispatch<React.SetStateAction<string>> | any,
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, setColumnHeader }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (value.length > 5) {
      console.log(value);
    }
  }, [value]);

  return (
    <>
      <Input
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
    </>
  );
};

export default SimpleInput;
