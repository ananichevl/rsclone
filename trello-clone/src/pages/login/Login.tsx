import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  UserOutlined, LockOutlined,
} from '@ant-design/icons';
import { loginUser } from '../../service/Service';

interface LoginFormModel {
  username: string
  password: string
}

export interface UserModel {
  id: string
  login: string
  token: string
}

const Login: React.FC = () => {
  const history = useHistory();

  const onFinish = async (value: LoginFormModel) => {
    const user = await loginUser(value.username, value.password);
    document.cookie = `Bearer=${user.token}`;
    history.push('/');
  };

  const onFinishFailed = () => console.log('fail');
  const { t } = useTranslation();

  return (
    <div>
      <h1 style={{ width: '20rem', margin: '5rem auto 1rem', textAlign: 'center' }}>{t('log_in')}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          style={{ maxWidth: 300 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label={t('username')}
            name="username"
            rules={[{ required: true, message: `${t('login_input_message')}` }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('username')} />
          </Form.Item>

          <Form.Item
            label={t('password')}
            name="password"
            rules={[{ required: true, message: `${t('password_input_message')}` }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
              {t('log_in_btn')}
            </Button>
            <div>
              {t('or')}
              <Link to="/signUp">{t('register_link')}</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
