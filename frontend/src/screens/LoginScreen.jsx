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
import IndexAccountantScreen from './Accountant/IndexAdminScreen'
import IndexLecturerScreen from './Lecturer/IndexParentScreen'
import IndexParentScreen from './Parent/IndexParentScreen'
import IndexStudentScreen from './Student/IndexStudentScreen'

const LoginScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [message,setMessage] = useState(null);
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    // if (userInfo) {
    //   history.push(redirect)
    // }
  }, [history, userInfo, redirect])

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
    {/* Your login form code */}
  </Container>
) : (
  <>
    {userInfo.userType === 'admin' && <IndexAdminScreen />}
    {userInfo.userType === 'accountant' && <IndexAccountantScreen />}
    {userInfo.userType === 'lecturer' && <IndexLecturerScreen />}
    {userInfo.userType === 'student' && <IndexStudentScreen />}
    {userInfo.userType === 'parent' && <IndexParentScreen />}
  </>
)}

    
      
    </>
  )
}

export default LoginScreen
