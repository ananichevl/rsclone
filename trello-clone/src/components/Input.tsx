import React, { useRef, useState } from 'react'; // useEffect,
import { Input } from 'antd';

interface IInputProps {
  placeholder: string
}

const SimpleInput: React.FC<IInputProps> = ({ placeholder }) => {
  const [value] = useState();
  const inputRef = useRef(null);

  // if (inputRef.current !== null) {
  //   inputRef.current.focus();
  // }

  // useEffect(() => {
  //   console.log(inputRef.value);
  // });

  return (
    <div>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        // onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default SimpleInput;
