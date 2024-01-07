import React, {useCallback, useState, useEffect } from 'react';
import { Table,  ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { Form, Input, Select,  Button, Col, Row } from 'antd';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { updateUserProfile } from '../../actions/userActions';


const StudentProfileScreen = () => {
  const [errorMsg, setErrorMsg] = useState('');

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

  const initialValues = {
    firstName: userInfo.userData.firstName,
    lastName: userInfo.userData.lastName,
    gender: userInfo.userData.gender,
    dob: moment(userInfo.userData.dob), // You may need to use a date library like moment for proper date formatting
    religion: userInfo.userData.religion,
    email: userInfo.email,
    nationalID: userInfo.userData.nationalID,
    phone: userInfo.userData.phone,
    // ... (other form fields)
  };
  console.log(initialValues);


  const onFinish = async (values) => {
    console.log('Received values:', values);

    if (values.password && values.password !== values.confirmPassword) {
      setErrorMsg(`Password and Confirm Password do not match`);
      return;
    } else {
      if (selectedImages.length > 0) {
        const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

        if (uploadedFileUrl !== null) {
          // If the file is uploaded successfully, add the secure_url to the values
          values.photo = uploadedFileUrl;
          values.userType = userInfo.userType
          dispatch(updateUserProfile(values))
            .then(() => {
              // Handle success
              message.success('Profile updated successfully!');
            })
            .catch((error) => {
              // Handle failure
              console.log('Error updating profile:', error);
            });
        } else {
          // Handle failure to upload file
          console.log('Error uploading file');
        }
      } else {
        // If no file is selected, proceed with updating the profile without a photo
        values.userType = userInfo.userType

        dispatch(updateUserProfile(values))
          .then(() => {
            // Handle success
            message.success('Profile updated successfully!');
          })
          .catch((error) => {
            // Handle failure
            console.log('Error updating profile:', error);
          });
      }
    }
  };
  


useEffect(() => {
  dispatch(listSchools());
  dispatch(listCourses());
}, [dispatch]);


const [selectedImages, setSelectedImages] = useState([]);
    // Add this
    const [uploadStatus, setUploadStatus] = useState("");
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
          setSelectedImages((prevState) => [...prevState, file]);
        });
      }, []);

      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
    onDrop,
    accept: acceptedImageTypes.join(','), 
  });


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
                    <div class="no-gutters align-items-center">
                      <div class="text-xs font-weight-bold text-uppercase mb-1 text-center">
                      <img src={userInfo.userData.photo} width={100} alt="" />
                      </div>
                      
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
    <td>First Name:</td>
    <th>{userInfo.userData.firstName}</th>
  </tr>
  <tr>
    <td>Last Name:</td>
    <th>{userInfo.userData.lastName}</th>
  </tr>
  <tr>
    <td>Gender:</td>
    <th>{userInfo.userData.gender}</th>
  </tr>
  <tr>
    <td>Date of Birth:</td>
    <th>{userInfo.userData.dob}</th>
  </tr>

  <tr>
    <td>Religion:</td>
    <th>{userInfo.userData.religion}</th>
  </tr>

  <tr>
    <td>Phone Number:</td>
    <th>{userInfo.userData.phone}</th>
  </tr>

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
      initialValues={initialValues} 
    >
         {errorMsg && <Message variant='danger'> <div className="text-center"> {errorMsg} </div></Message>}

         <div className='drop-zone-cotainer'>
          <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop file(s) here ...</p>
            ) : (
              <p>Drag and drop file(s) here, or click to select files</p>
            )}
          </div>

          <div className='images'>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div>

        </div>

      <Row gutter={[16, 16]}>


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
        label="Password"
        name="password"
        rules={[
          {
            required: false,
            message: 'Please input the Password',
          },
        ]}
      >
        <Input />
      </Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
        label="Confirm Password"
        name="c_password"
        rules={[
          {
            required: false,
            message: 'Please input the Password Again',
          },
        ]}
      >
        <Input />
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
