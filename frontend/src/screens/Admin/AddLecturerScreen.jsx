import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, message, Col, Row } from 'antd';
import Sidebar from './components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { listSchools } from '../../actions/schoolActions';
import { listCourses, listCoursesBySchool } from '../../actions/courseActions';
import { createLecturer } from '../../actions/lecturerActions';
import Topbar from './components/Topbar';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import {Button} from 'react-bootstrap'

const { Option } = Select;

const AddLecturerScreen = () => {
  const onFinish = async (values) => {
    console.log('Received values:', values);


    
    if (selectedImages.length > 0) {
      const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

      if (uploadedFileUrl !== null) {
        // If the file is uploaded successfully, add the secure_url to the values
        values.photo = uploadedFileUrl;
        values.userType = "lecturer"
    
      }

        // Calculate age based on date of birth
  const dob = new Date(values.dob);
  const ageDiffMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiffMs); // Epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Check if age is at least 18 years
  if (age < 18) {
    message.error('Lecturer must be at least 18 years old.');
    return; // Stop execution if age is less than 18
  }

         // Dispatch the createLecturer action
    dispatch(createLecturer(values)).then((response) => {
      if (response.message) {
        
        message.success(response.message);

        // history.push('/admin/allLecturers');

      } else {
        // Handle failure, show an error message
        message.error(response.error);
      }
    });
    
    }
    else{
         // Dispatch the createLecturer action
    dispatch(createLecturer(values)).then((response) => {
      if (response.success) {
        // Handle success, you may redirect the user or show a success message
        message.success('Lecturer created successfully!');
      } else {
        // Handle failure, show an error message
        message.error(response.error);
      }
    });
    }
 
  };
  
  const handleCourseChange = (selectedCourseId) => {
    dispatch(listCoursesBySchool(selectedCourseId))
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

  const dispatch = useDispatch();

// Fetch schools and courses when the component mounts
useEffect(() => {
  dispatch(listSchools());
  dispatch(listCourses());
}, [dispatch]);

const schoolsList = useSelector((state) => state.schoolList);
const { loading: loadingSchools, schools, error: errorSchools } = schoolsList;

const courseList = useSelector((state) => state.courseList);
const {success, courses } = courseList;

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
    
            <div class="pt-3 w-100">
            <div className="w-100 text-center">
             
            </div>
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
  <Select onChange={handleCourseChange} loading={loadingSchools}>
    {schools && schools.map((school) => (
      <Option key={school._id} value={school._id}>
        {school.name}
      </Option>
    ))}
  </Select>
</Form.Item>
                      </Col>

                      {courses &&  
  <Col span={6}>
    <Form.Item
      label={`Courses ${courses.length}`}
      name="courses"
      rules={[{ required: true, message: 'Please select the course unit!' }]}
    >
      <Select mode="multiple">
        {courses.map((course) => (
          <Select.Option key={course._id} value={course._id}>
            {course.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  </Col>
}


                   

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
        label="Upload Lecturer Photo"
        name="photo"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Please upload a photo with dimensions 150px X 150px."
      >
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
    
            </section>
            </div>
           
    
    
    </div>
    
        </div>

    
  );
};

export default AddLecturerScreen;
