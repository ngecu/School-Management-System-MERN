import { Form,Input } from 'antd';
import React, { useState, useEffect } from 'react'
import {  Button, Container,Row,Col } from 'react-bootstrap';
import { changePassword } from '../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom';

const NewPasswordScreen = () => {
  const { id } = useParams();
  const { token } = useParams();


  
  const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const userChangePassword = useSelector((state) => state.userChangePassword)
    const { loading, error, success } = userChangePassword

    
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


  const submitPasswordHandler = (values) => {
    console.log("submitted ",values);
    const { password,confirmpassword } = values;

    if (password !== confirmpassword) {
      setMessage('Passwords do not match')
    }
    else{
    dispatch(changePassword(id,token,password))

    }
    // dispatch(resetPassword(Email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', padding: '20px', width: '800px' }}>

    <Row>
        <Col md={12} className='text-center'>
          <h1>School Management System</h1>
         
        </Col>

        <Col md={6}>

    <div className="entry-content my-4">
      <div className="woocommerce">
        <div className="woocommerce-notices-wrapper"></div>

        <p>Enter a new password below</p>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>{success.message}</Message>}
          {loading && <Loader />}

        <Form
            initialValues={{ remember: true }}
            onFinish={submitPasswordHandler}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 32,
            }}
            wrapperCol={{
              span: 32,
            }}
          
            onFinishFailed={onFinishFailed}
            autoComplete="off"
  >
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Item>


    <Form.Item
      label="Confirm Password"
      name="confirmpassword"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </Form.Item>
 
    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 32,
      }}
    >
      <Button variant='primary' type="submit" className='w-100' htmlType="submit">
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

export default NewPasswordScreen;
