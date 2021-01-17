import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string,
  onChange: (arg: string) => void
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, onChange }) => {
  const [value, setValue] = useState('');

  // example usage of UseEffect
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
