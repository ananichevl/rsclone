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
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  };

  const onFinish = async () => {
    const user = await loginUser(login, password);
    document.cookie = `Bearer=${user.token}`;
    history.push('/');
  };

  const onFinishFailed = () => console.log('fail');

  return (
    <div>
      <h1 style={{ width: '10rem', margin: '5rem auto 1rem' }}>Please log in</h1>
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
    </div>
  );
};

export default Login;
