import React, { createRef, useState } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder }) => {
  const [value] = useState();
  const inputRef = createRef<HTMLInputElement>();

  useState(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // console.log(Input.value);
    }
  });

  return (
    <>
      <Input
        // ref={inputRef}
        placeholder={placeholder}
        onChange={
          (
            e: React.FormEvent<HTMLInputElement>
          ) => { const newValue = e.currentTarget.value;
            console.log(newValue);
          }
        }
        value={value}
      />
    </>
  );
};

export default SimpleInput;
