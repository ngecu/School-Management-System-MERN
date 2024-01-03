import { Form, Input, Button, message } from 'antd';
import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import { Container } from 'react-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'


const LostPasswordScreen = () => {
  const key = 'updatable';
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [message,setMessage] = useState(null);

  const userResetPassword = useSelector((state) => state.userResetPassword)
  const { loading, error, success } = userResetPassword


  const submitPasswordHandler = async (values) => {
    try {
      const { Email } = values;
      await dispatch(resetPassword(Email));
   
    } catch (error) {
      message.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : 'Failed to reset password.'
      );
    }
  };
  
  
  

  return (
    <Container>
      <div className="entry-content my-4">
        <div className="woocommerce">
          <div className="woocommerce-notices-wrapper"></div>
          <p>
            Lost your password? Please enter your username or email address. You will receive a
            link to create a new password via email.
          </p>
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>{success.message}</Message>}
          {loading && <Loader />}

          
          <Form
            initialValues={{ remember: true }}
            onFinish={submitPasswordHandler}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 24,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Email address"
              name="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your username or email!',
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button variant="success" type="primary" htmlType="submit">
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default LostPasswordScreen;
