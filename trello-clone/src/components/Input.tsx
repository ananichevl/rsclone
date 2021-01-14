import React, { useRef, useState, useEffect } from 'react';
import { Input } from 'antd';

interface IInputProps {
  placeholder: string,
  setColumnHeader: React.Dispatch<React.SetStateAction<string>>
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder, setColumnHeader }) => {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

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
          setColumnHeader(e.target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default SimpleInput;
