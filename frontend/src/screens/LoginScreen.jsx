import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register } from '../actions/userActions'
import { Checkbox, Form, Input } from 'antd'
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  SafetyOutlined 
} from '@ant-design/icons'
import logo from '../assets/logo.jpg' 

import IndexAdminScreen from './Admin/IndexAdminScreen'
import IndexAccountantScreen from './Accountant/IndexAccountantScreen'
import IndexLecturerScreen from './Lecturer/IndexLecturerScreen'
import IndexStudentScreen from './Student/IndexStudentScreen'
import IndexParentScreen from './Parent/IndexParentScreen'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitLoginHandler = (values) => {
    console.log("submitted ", values)
    const { email, password } = values
    dispatch(login(email, password))
  }

  const submitRegisterHandler = (values) => {
    console.log("submitted register ", values)
    const { name, password, confirmPassword } = values

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      {!userInfo ? (
        <Container 
          fluid 
          style={{ 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f4f8',
            padding: '20px'
          }}
        >
          <div style={{ 
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            borderRadius: '16px',
            overflow: 'hidden',
            width: '1000px',
            maxWidth: '100%',
            background: '#ffffff'
          }}>
            <Row style={{ margin: 0 }}>
              {/* Left Side - Image & Branding */}
              <Col 
                md={6} 
                style={{ 
                  padding: 0,
                  background: '#1a2332',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '550px',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  {/* Decorative elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(52, 152, 219, 0.1)',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '-80px',
                    left: '-80px',
                    width: '250px',
                    height: '250px',
                    background: 'rgba(52, 152, 219, 0.08)',
                    borderRadius: '50%'
                  }} />

                  <div style={{ 
                    marginBottom: '30px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: '#3498db',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 8px 25px rgba(52, 152, 219, 0.3)'
                    }}>
                      <img 
                        src={logo} 
                        alt="School Management"
                        style={{ 
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                        }}
                      />
                    </div>
                  </div>

                  <h2 style={{ 
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '28px',
                    marginBottom: '15px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Welcome Back!
                  </h2>

                  <p style={{ 
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '15px',
                    lineHeight: '1.7',
                    maxWidth: '350px',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    Sign in to access your school management dashboard and stay connected with your academic community.
                  </p>

                  <div style={{ 
                    marginTop: '35px',
                    display: 'flex',
                    gap: '15px',
                    position: 'relative',
                    zIndex: 1,
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                  }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      color: '#ffffff',
                      fontSize: '12px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <SafetyOutlined style={{ marginRight: '6px' }} />
                      Secure Login
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      color: '#ffffff',
                      fontSize: '12px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <UserOutlined style={{ marginRight: '6px' }} />
                      Role Based Access
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.1)',
                      padding: '8px 18px',
                      borderRadius: '20px',
                      color: '#ffffff',
                      fontSize: '12px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      24/7 Support
                    </div>
                  </div>

                  {/* Footer text on left panel */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: '11px',
                    zIndex: 1
                  }}>
                    © 2026 School Management System
                  </div>
                </div>
              </Col>

              {/* Right Side - Login Form */}
              <Col 
                md={6} 
                style={{ 
                  padding: '50px 45px',
                  background: '#ffffff'
                }}
              >
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '26px',
                    fontWeight: '700',
                    color: '#1a2332',
                    marginBottom: '8px'
                  }}>
                    Sign In
                  </h3>
                  <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                    Enter your credentials to continue
                  </p>
                </div>

                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader />}

                <Form
                  initialValues={{ remember: true }}
                  onFinish={submitLoginHandler}
                  layout="vertical"
                  name="basic"
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  size="large"
                >
                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#2c3e50' }}>Email Address</span>}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                      {
                        type: 'email',
                        message: 'Please enter a valid email!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: '#bdc3c7' }} />}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-cy="email"
                      placeholder="you@example.com"
                      style={{ 
                        borderRadius: '10px',
                        padding: '10px 12px',
                        border: '2px solid #ecf0f1'
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span style={{ fontWeight: '600', color: '#2c3e50' }}>Password</span>}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: '#bdc3c7' }} />}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      data-cy="password"
                      placeholder="Enter your password"
                      style={{ 
                        borderRadius: '10px',
                        padding: '10px 12px',
                        border: '2px solid #ecf0f1'
                      }}
                    />
                  </Form.Item>

                  <Row style={{ marginBottom: '25px' }}>
                    <Col md={6}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox style={{ color: '#2c3e50' }}>
                          Remember me
                        </Checkbox>
                      </Form.Item>
                    </Col>
                    <Col md={6} style={{ textAlign: 'right' }}>
                      <Link 
                        to="/lost-password" 
                        style={{ 
                          color: '#3498db',
                          fontSize: '14px',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>

                  <Form.Item style={{ marginBottom: '15px' }}>
                    <Button
                      variant='primary'
                      className='w-100'
                      type="submit"
                      htmlType="submit"
                      data-cy="login-btn"
                      style={{
                        borderRadius: '10px',
                        padding: '14px',
                        fontWeight: '600',
                        fontSize: '16px',
                        border: 'none',
                        background: '#3498db',
                        color: '#ffffff',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#2980b9'
                        e.target.style.transform = 'translateY(-2px)'
                        e.target.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#3498db'
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      Sign In
                    </Button>
                  </Form.Item>

                </Form>
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
          {userInfo.userType === 'Parent' && <IndexParentScreen />}
        </>
      )}
    </>
  )
}

export default LoginScreen