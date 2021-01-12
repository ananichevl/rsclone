import React from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface IButtonProps {
  title: string
  icon?: React.ReactNode
}

const SimpleButton: React.FC<IButtonProps> = ({title, icon}) => {
  const [counter, setCounter] = React.useState<number>(0)
    return(
      <div onClick={() => setCounter((prevCounter) => ++prevCounter)}>
        <Button icon={icon}>
          {counter}
        </Button>
      </div>
    )
}

export default SimpleButton