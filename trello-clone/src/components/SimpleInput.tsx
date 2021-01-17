import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Input } from 'antd';
// import createSelectBoardAction from '../store/actions/selectBoard';

// (e) => {
//   setValue(e.target.value);
//   if (setColumnHeader) {
//     setColumnHeader(e.target.value);
//   }
//   dispatch(createSelectBoardAction(e.target.value));
// }

interface IInputProps {
  placeholder: string,
  // setColumnHeader?: React.Dispatch<React.SetStateAction<string>> | any,
  onChange: (arg: string) => void
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState('');
  // const dispatch = useDispatch();

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
          onChange(e.target.value);
        }}
        value={value}
      />
    </>
  );
};

export default SimpleInput;
