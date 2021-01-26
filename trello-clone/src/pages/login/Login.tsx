import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { useHistory } from 'react-router-dom';
import SimpleInput from '../../components/simpleInput/SimpleInput';
import { loginUser } from '../../service/Service';

export interface UserModel {
  id: string
  login: string
  token: string
}

const Login: React.FC = () => {
  const history = useHistory();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = async () => {
    const user = await loginUser(login, password);
    document.cookie = `Bearer=${user.token}`;
    history.push('/');
  };

  const onFinishFailed = () => console.log('fail');

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <SimpleInput onBlur={() => console.log()} onChange={setLogin} inputValue={login} placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <SimpleInput onBlur={() => console.log()} onChange={setPassword} inputValue={password} placeholder="Password" />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
