import React, {useCallback, useState, useEffect } from 'react';
import { Table,  ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { Form, Input, message,  Button, Col, Row } from 'antd';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { updateUserProfile } from '../../actions/userActions';
import Topbar from './components/Topbar';
import moment from 'moment';

const StudentProfileScreen = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const location = useLocation();
  const { pathname } = location;

  console.log(pathname);

  const dispatch = useDispatch();



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
      message.error(`Password and Confirm Password do not match`);
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
            console.log("heelo");
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

<Topbar/>
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
    <th>{new Date(userInfo.userData.dob).toLocaleDateString()}</th>
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
        <Input disabled/>
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
        <Input disabled />
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
        name="confirmPassword"
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
