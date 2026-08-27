import { Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { MailOutlined, SafetyOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg' 


const LostPasswordScreen = () => {
  const key = 'updatable';
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { loading, error, success } = userResetPassword;

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

      return () => clearInterval(timer);
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
                Reset Password
              </h2>

              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                lineHeight: '1.7',
                maxWidth: '350px',
                position: 'relative',
                zIndex: 1
              }}>
                Enter your email address and we'll send you a link to reset your password securely.
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
                  Secure Reset
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  color: '#ffffff',
                  fontSize: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <LockOutlined style={{ marginRight: '6px' }} />
                  Password Recovery
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

          {/* Right Side - Reset Password Form */}
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
                Forgot Password?
              </h3>
              <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
                Enter your email to receive a reset link
              </p>
            </div>

            <div style={{
              background: '#f8f9fa',
              padding: '15px 20px',
              borderRadius: '10px',
              marginBottom: '25px',
              borderLeft: '4px solid #3498db'
            }}>
              <p style={{
                color: '#2c3e50',
                fontSize: '14px',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Lost your password? Please enter your email address. You will receive a
                link to create a new password via email.
              </p>
            </div>

            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>{success.message}</Message>}
            {loading && <Loader />}

            {buttonDisabled && (
              <p style={{
                textAlign: 'center',
                color: '#7f8c8d',
                fontSize: '14px',
                marginTop: '10px'
              }}>
                Button disabled for {countdown} seconds
              </p>
            )}

            <Form
              initialValues={{ remember: true }}
              onFinish={submitPasswordHandler}
              layout="vertical"
              name="basic"
              autoComplete="off"
              size="large"
            >
              <Form.Item
                label={<span style={{ fontWeight: '600', color: '#2c3e50' }}>Email Address</span>}
                name="Email"
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
                  placeholder="you@example.com"
                  style={{
                    borderRadius: '10px',
                    padding: '10px 12px',
                    border: '2px solid #ecf0f1'
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  variant="primary"
                  className='w-100'
                  type="primary"
                  htmlType="submit"
                  disabled={buttonDisabled}
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
                    if (!buttonDisabled) {
                      e.target.style.background = '#2980b9';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!buttonDisabled) {
                      e.target.style.background = '#3498db';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  Send Reset Link
                </Button>
              </Form.Item>

              <div style={{
                textAlign: 'center',
                marginTop: '20px',
                paddingTop: '25px',
                borderTop: '2px solid #f0f4f8'
              }}>
                <p style={{
                  color: '#7f8c8d',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Remember your password?{' '}
                  <Link
                    to="/"
                    style={{
                      color: '#3498db',
                      fontWeight: '600',
                      textDecoration: 'none'
                    }}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LostPasswordScreen;