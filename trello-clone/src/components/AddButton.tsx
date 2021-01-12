import React from 'react'
import { Button } from 'antd';

interface IButtonProps {
  title: string
  icon?: React.ReactNode
}

const SimpleButton: React.FC<IButtonProps> = ({title, icon}) => {
    return(
      <>
        <Button icon={ icon }>
          {title}
        </Button>
      </>
    )
}

export default SimpleButton