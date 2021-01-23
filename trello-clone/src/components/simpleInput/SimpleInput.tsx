import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string;
  onChange: (arg: string) => void;
  onBlur: (arg?: string) => void;
  inputValue?: string;
}

const SimpleInput: React.FC<IInputProps> = ({
  placeholder,
  onChange,
  onBlur,
  inputValue,
}) => {
  const [value, setValue] = useState(inputValue || '');

  useEffect(() => {
    setValue(inputValue || '');
  }, [inputValue]);

  return (
    <>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onBlur={(e) => {
          onBlur(e.target.value);
        }}
        value={value}
      />
    </>
  );
};

export default SimpleInput;
