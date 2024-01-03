import { Form,Input } from 'antd';
import React, { useState, useEffect } from 'react'
import {  Button, Container } from 'react-bootstrap';
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
    <Container>
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
              span: 8,
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
      <Button variant='success' type="submit" className='w-100' htmlType="submit">
        Reset Password
      </Button>
    </Form.Item>
  </Form>
      </div>
    </div>
    </Container>
  );
};

export default NewPasswordScreen;
