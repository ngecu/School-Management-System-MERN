import { Form, Input, message } from 'antd';

import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'


const LostPasswordScreen = () => {
  const key = 'updatable';
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [message,setMessage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const userResetPassword = useSelector((state) => state.userResetPassword)
  const { loading, error, success } = userResetPassword

  useEffect(() => {
    let timer;

    if (success) {
      setButtonDisabled(true);

      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      setTimeout(() => {
        setButtonDisabled(false);
        setCountdown(10);
        clearInterval(timer);
      }, 10000);

      return () => clearInterval(timer); // Clear the interval on component unmount
    }
  }, [success]);


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
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', padding: '20px', width: '800px' }}>
            <Row>
        <Col md={12} className='text-center'>
          <h1>School Management System</h1>
         
        </Col>

        <Col md={6}>
        <p>
            Lost your password? Please enter your username or email address. You will receive a
            link to create a new password via email.
          </p>
        <div className="entry-content my-4">
        <div className="woocommerce">
          <div className="woocommerce-notices-wrapper"></div>
         
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>{success.message}</Message>}
          {loading && <Loader />}


          {buttonDisabled && (
          <p style={{ textAlign: 'center', color: 'gray' }}>
            Button disabled for {countdown} seconds
          </p>
        )}
        
          
          <Form
            initialValues={{ remember: true }}
            onFinish={submitPasswordHandler}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 32,
            }}
            wrapperCol={{
              span: 24,
            }}
            autoComplete="off"
          >
            <Form.Item
             wrapperCol={{
              offset: 0,
              span: 32,
            }}
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
                span: 32,
              }}
            >
             <Button
              variant="primary"
              className='w-100'
              type="primary"
              htmlType="submit"
              disabled={buttonDisabled}
            >
              Reset Password
            </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
        </Col>

        <Col md={6}>
          <img src="https://www.edoptim.com/assets/school-management-software-system-edoptim-b5ef1e0f510b713c561367aa9b938021810178a1d8f2d67f56a200c953a0d86c.jpg
" alt="" className='w-100' />
          </Col>
        
        </Row>
     
      </div>
    </Container>
  );
};

export default LostPasswordScreen;
