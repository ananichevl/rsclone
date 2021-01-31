import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string;
  onChange: (arg: string) => void;
  onBlur: (arg?: string) => void;
  inputValue?: string;
  onPressEnter?: (arg?: string) => void;
}

const SimpleInput: React.FC<IInputProps> = ({
  placeholder,
  onChange,
  onBlur,
  inputValue,
  onPressEnter,
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
        onPressEnter={(e) => {
          onPressEnter(e.currentTarget.value);
        }}
        value={value}
        autofocus
      />
    </>
  );
};

export default SimpleInput;
