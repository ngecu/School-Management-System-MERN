import React, { useState, useEffect } from 'react';
import { Table,  ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { Form, Input, Select, DatePicker, Button, Upload, message, Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
const { Option } = Select;

const StudentProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
  
    // Extract parent details from values
  
    const formattedParents = [{
      fullName:values.parentFullName,
      phone:values.parentPhone,
      email:values.parentEmail,
    }]
   
    
  
  
    // Combine student data with formatted parent details
    const dataToSend = {
      ...values,
      parents: formattedParents,
    };
  
    // Dispatch the createStudent action
    dispatch(createStudent(dataToSend)).then((response) => {
      if (response.success) {
        // Handle success, you may redirect the user or show a success message
        message.success('Student created successfully!');
      } else {
        // Handle failure, show an error message
        message.error(response.error);
      }
    });
  };
  

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
  };


// Fetch schools and courses when the component mounts
useEffect(() => {
  dispatch(listSchools());
  dispatch(listCourses());
}, [dispatch]);

const schoolsList = useSelector((state) => state.schoolList);
const { loading: loadingSchools, schools, error: errorSchools } = schoolsList;

const coursesList = useSelector((state) => state.courseList);
const { loading: loadingCourses, courses, error: errorCourses } = coursesList;




  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  


  
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
   
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    
    </ul>

    
    <ul class="navbar-nav ml-auto">


      
     
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search"></i>
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>

     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-comments"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item">
          
            <div class="media">
              <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
       
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
          
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
           
            <div class="media">
              <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3"/>
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
              </div>
            </div>
            
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
     
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-bell"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item">
            <i class="fas fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true"  role="button">
          <i class="fas fa-th-large"></i>
          <i class="fas fa-right-from-bracket"></i>
        </a>
      </li>
    </ul>
  </nav>
  
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
            <div class="col-xl-4 col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col-xl-12 col-md-12 mr-2">
                    <div class="row no-gutters align-items-center">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">
                        <img src="https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/figure/student.png" alt="" />
                      </div>
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{userInfo.firstName}</div>
                      <div class="mt-2 mb-0 text-muted text-xs">
                       
                      </div>
                      </div>
                    </div>
                    <div class="col-xl-12 col-md-12 mr-2">
                    <table className='w-100'>
      <tbody>
        <tr>
          <td>Email:</td>
          <th>{userInfo.email}</th>
        </tr>
        <tr>
          <td>Password:</td>
          <th>{userInfo.password}</th>
        </tr>
        <tr>
          <td>First Name:</td>
          <th>{userInfo.firstName}</th>
        </tr>
        <tr>
          <td>Last Name:</td>
          <th>{userInfo.lastName}</th>
        </tr>
        <tr>
          <td>Gender:</td>
          <th>{userInfo.gender}</th>
        </tr>
        <tr>
          <td>Date of Birth:</td>
          <th>{userInfo.dob}</th>
        </tr>
        {/* <tr>
          <td>Religion:</td>
          <th>{userInfo.religion}</th>
        </tr>
        <tr>
          <td>Phone:</td>
          <th>{userInfo.phone}</th>
        </tr>
        <tr>
          <td>National ID:</td>
          <th>{userInfo.nationalID}</th>
        </tr>
        <tr>
          <td>Course:</td>
          <th>{userInfo.course}</th>
        </tr>
        <tr>
          <td>Parents:</td>
          <th>
            {userInfo.parents.map((parent, index) => (
              <div key={index}>
                <p>Email: {parent.email}</p>
                <p>Full Name: {parent.fullName}</p>
                <p>Surname: {parent.surname}</p>
                <p>Date of Join: {parent.dateOfJoin}</p>
                <p>Date of Birth: {parent.dob}</p>
                <p>Phone: {parent.phone}</p>
                <p>Gender: {parent.gender}</p>
                <p>Status: {parent.status ? 'Active' : 'Inactive'}</p>
                <p>Last Login Date: {parent.lastLoginDate}</p>
                <p>Last Login IP: {parent.lastLoginIp}</p>
              </div>
            ))}
          </th>
        </tr>
        <tr>
          <td>Status:</td>
          <th>{userInfo.status ? 'Active' : 'Inactive'}</th>
        </tr>
        <tr>
          <td>Last Login Date:</td>
          <th>{userInfo.lastLoginDate}</th>
        </tr>
        <tr>
          <td>Last Login IP:</td>
          <th>{userInfo.lastLoginIp}</th>
        </tr> */}
      </tbody>
    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-8 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                <Form
      name="admissionForm"
      onFinish={onFinish}
      layout="vertical"
      labelCol={{
        span: 32,
      }}
      wrapperCol={{
        span: 32,
      }}
    >
      <Row gutter={[16, 16]}>
                    <Col span={6}>
                    <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input the first name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                    </Col>

                    <Col span={6}>
                    <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: 'Please input the last name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                    </Col>

                    <Col span={6}>
                    <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: 'Please select the gender!',
          },
        ]}
      >
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
                    </Col>


                    <Col span={6}>
                              <Form.Item
                  label="Date Of Birth"
                  name="dob"
                  rules={[
                    {
                      required: true,
                      message: 'Please select the date of birth!',
                    },
                  ]}
                >
                  <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
                    </Col>


                    <Col span={6}>
                    <Form.Item
        label="Religion"
        name="religion"
        rules={[
          {
            required: true,
            message: 'Please select the religion!',
          },
        ]}
      >
        <Select>
          <Option value="islam">Islam</Option>
          <Option value="hindu">Hindu</Option>
          <Option value="christian">Christian</Option>
          <Option value="buddish">Buddish</Option>

        </Select>
      </Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
        label="E-Mail"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input Your EMail',
          },
        ]}
      >
        <Input />
      </Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
  label="School"
  name="school"
  rules={[
    {
      required: true,
      message: 'Please select the school!',
    },
  ]}
>
  <Select loading={loadingSchools}>
    {schools && schools.map((school) => (
      <Option key={school._id} value={school._id}>
        {school.name}
      </Option>
    ))}
  </Select>
</Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
  label="Course"
  name="course"
  rules={[
    {
      required: true,
      message: 'Please select the course!',
    },
  ]}
>
  <Select loading={loadingCourses}>
    {courses && courses.map((course) => (
      <Option key={course._id} value={course._id}>
        {course.name}
      </Option>
    ))}
  </Select>
</Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
        label="National ID"
        name="nationalID"
        rules={[
          {
            required: true,
            message: 'Please input the National Number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input the Phone Number!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
        label="Upload Student Photo"
        name="photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Please upload a photo with dimensions 150px X 150px."
      >
        <Upload
          name="photo"
          beforeUpload={beforeUpload}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
                      </Col>
                    </Row>





      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 32,
        }}
      >
        <Button type="primary" className='w-100' htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
                    </div>
                    </div>
            </div>
       
        </div>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default StudentProfileScreen;
