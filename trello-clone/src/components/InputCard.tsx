import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SimpleInput from './SimpleInput';

// import TaskFormModal from './TaskFormModal';
// const TaskFormModal: React.FC = () => {

//   // state = {
//   //   loading: false,
//   //   visible: false,
//   // };

//   // render() {
//   return (
//     <>
//       {/* <Button type="primary" onClick={showModal}>
//         Open Modal with customized footer
//       </Button> */}
//     </>
//   );
// }

const InputCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [columnName, setColumnName] = useState<string>('');

  return (
    <>
      <Collapse isOpened={!open}>
        <div style={{ width: '270px' }} onClick={() => console.log('click')}>
          <SimpleInput setColumnHeader={setColumnName} placeholder="Ввести заголовок списка" />
          <Button type="primary" style={{ margin: '10px', backgroundColor: '#5AAC44' }}>
            Добавить список
          </Button>
          <Button onClick={() => setOpen(!open)} type="primary" shape="circle" icon={<CloseOutlined />} />
        </div>
      </Collapse>
    </>
  );
};

export default InputCard;
