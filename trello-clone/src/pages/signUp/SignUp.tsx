import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';
import {
  UserOutlined, LockOutlined,
} from '@ant-design/icons';
import { createUser } from '../../service/Service';
import './signUp.scss';
import registrImg from '../../utils/img/registr.png';

export interface SignUpFormModel {
  username: string
  password: string
  passwordRepeat: string
}

const SignUp: React.FC = () => {
  const history = useHistory();

  const onFinish = async (value: SignUpFormModel) => {
    if (value.password === value.passwordRepeat) {
      const user = await createUser(value.username, value.password);
      document.cookie = `Bearer=${user.token}`;
      history.push('/');
    }
  };

  const onFinishFailed = () => console.log('fail');
  const { t } = useTranslation();

  return (
    <div className="sign-up">
      <h1 className="sign-up-title">{t('sign_up')}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Form
          style={{ maxWidth: 300 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: `${t('login_input_message')}` }]}
          >
            <Input
              className="sign-up-input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t('username')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: `${t('password_input_message')}` }]}
          >
            <Input
              className="sign-up-input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="passwordRepeat"
            rules={[{ required: true, message: `${t('password_input_message')}` }]}
          >
            <Input
              className="sign-up-input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('confirm')}
            />
          </Form.Item>

          <Form.Item>
            <Button className="sign-up-btn" style={{ width: '100%' }} type="primary" htmlType="submit">
              {t('sign_up_btn')}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <img src={registrImg} alt="team" />
    </div>
  );
};

export default SignUp;
