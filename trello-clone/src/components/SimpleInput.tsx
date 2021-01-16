import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string,
  setColumnHeader: React.Dispatch<React.SetStateAction<string>>
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, setColumnHeader }) => {
  const [value, setValue] = useState('');

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
          setColumnHeader(e.target.value);
        }}
        value={value}
      />
    </>
  );
};

export default SimpleInput;
