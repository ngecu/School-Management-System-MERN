import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {  Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register } from '../actions/userActions'
import { Checkbox, Form, Input } from 'antd'
// import ProfileScreen from './ProfileScreen'
import logourl from '../assets/logo.png'
import ProfileScreen from './ProfileScreen'
import IndexAdminScreen from './Admin/IndexAdminScreen'
import IndexAccountantScreen from './Accountant/IndexAccountantScreen'
import IndexLecturerScreen from './Lecturer/IndexLecturerScreen'

import IndexStudentScreen from './Student/IndexStudentScreen'


const LoginScreen = ({ location, history }) => {


   
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [message,setMessage] = useState(null);
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'


  const submitLoginHandler = (values) => {
    console.log("submitted ",values);
    const { email, password } = values;
    dispatch(login(email, password));
  };

  const submitRegisterHandler = (values) => {
    console.log("submitted register ",values);
    const { name, password,confirmPassword } = values;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <>
{!userInfo ? (
  <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
     
     <div style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px', padding: '20px', width: '800px' }}>

     <Row>
       <Col md={12} className='text-center'>
         <h1>School Management System</h1>
       Sign in to start your session
       </Col>
       <Col md={6}>
    

       
         {error && <Message variant='danger'>{error}</Message>}
     {message && <Message variant='danger'>{message}</Message>}

     {loading && <Loader />}

         <Form
           initialValues={{ remember: true }}
           onFinish={submitLoginHandler}
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
     label="Email address"
     name="email"
     rules={[
       {
         required: true,
         message: 'Please input your username or email!',
       },
     ]}
   >
     <Input
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       data-cy="email"
     />
   </Form.Item>

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
             data-cy="password"
     />
   </Form.Item>

   <Row>
     <Col md={6}>
     <Form.Item
 name="remember"
 valuePropName="checked"
 wrapperCol={{
   offset: 0,
   span: 32,
 }}
 style={{ marginBottom: 0 }}  // Add this style to remove the bottom margin
>
 <Checkbox>Remember me</Checkbox>
</Form.Item>
     </Col>

     <Col md={6}>
     <Form.Item
 wrapperCol={{
   offset: 0,
   span: 32,
 }}
 style={{ marginBottom: 0 }}  // Add this style to remove the bottom margin
>
 <Button variant='primary' className='w-100' type="submit" htmlType="submit" data-cy="login-btn">
   Login
 </Button>
</Form.Item>
</Col>
   </Row>




 </Form>

{/* 

                   <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                       <div class="border-bottom w-100 ml-5"></div>
                       <span class="px-2 small text-muted font-weight-bold text-muted">OR</span>
                       <div class="border-bottom w-100 mr-5"></div>
                   </div>

                   <div class="d-grid mb-2 google-btn-holder">
                  
               <button class="btn  btn-google w-100  btn-login fw-bold text-uppercase" disabled={true} type="submit" style={{
 color: "white",backgroundColor: "#ea4335"}}>
                 <i class="fab fa-google me-2"></i> Login in with Google
               </button>
             </div> */}

<div className="text-center">
<Link to="/lost-password">Lost Your Password?</Link>

</div>


       </Col>

       <Col md={6}>
         <img src="https://www.edoptim.com/assets/school-management-software-system-edoptim-b5ef1e0f510b713c561367aa9b938021810178a1d8f2d67f56a200c953a0d86c.jpg
" alt="" className='w-100' />
         </Col>

     </Row>

     </div>
     </Container>
) : (
  <>
    {userInfo.userType === 'Admin' && <IndexAdminScreen />}
    {userInfo.userType === 'Accountant' && <IndexAccountantScreen />}
    {userInfo.userType === 'Lecturer' && <IndexLecturerScreen />}
    {userInfo.userType === 'Student' && <IndexStudentScreen />}
  
  </>
)}

    
      
    </>
  )
}

export default LoginScreen
