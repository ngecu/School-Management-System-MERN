import React, { useCallback, useEffect } from 'react';
import { Form, Input, Select, DatePicker,  Upload, message, Col, Row } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar'
import { useSelector, useDispatch } from 'react-redux';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import { createStudent } from '../../actions/studentActions';
import Topbar from './components/Topbar';
import { useState } from 'react';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { useHistory } from 'react-router-dom';
import {Button} from 'react-bootstrap'
const { Option } = Select;

const AdmissionScreen = () => {

  const [schoolselected,setSchoolSelect] = useState(null)
  const [yearofstudyselected,setYearofstudy] = useState(null)
  const [courseselected,setcourse] = useState(null)

  
  
  const onFinish = async (values) => {
    console.log('Received values:', values);
  
    // Function to generate a unique ID (for example, using timestamp)
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const admissionNumber = `${schoolselected}-${yearofstudyselected}-${courseselected}-${generateUniqueId()}`;
console.log("Admission Number:", admissionNumber);

  // Calculate age based on date of birth
  const dob = new Date(values.dob);
  const ageDiffMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDiffMs); // Epoch
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  // Check if age is at least 18 years
  if (age < 18) {
    message.error('Student must be at least 18 years old.');
    return; // Stop execution if age is less than 18
  }

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

    if (selectedImages.length > 0) {
      const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

      if (uploadedFileUrl !== null) {
        // If the file is uploaded successfully, add the secure_url to the values
        values.photo = uploadedFileUrl;
        values.userType = "student"
        dispatch(createStudent(values))
          .then(() => {
            // Handle success
            // message.success('Student added successfully!');
            alert('Student added successfully!')
            // Redirect to /allStudents
        history.push('/admin/allStudents');
          })
          .catch((error) => {
            // Handle failure
            console.log('Error adding student:', error);
          });
      } else {
        // Handle failure to upload file
        console.log('Error uploading file');
      }
    } else {
    
  
    // Dispatch the createStudent action
    dispatch(createStudent(dataToSend)).then((response) => {
      console.log("repsonse is ",response);
      if (response.message) {
        // Handle success, you may redirect the user or show a success message
        message.success(response.message);
        //   alert('Student created successfully!Redirecting')
        // // Redirect to /allStudents
      } else {
        // Handle failure, show an error message
        message.error(response.error);
      }
    });
  }
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


useEffect(() => {
  dispatch(listSchools());
  dispatch(listCourses());
}, [dispatch]);

const schoolsList = useSelector((state) => state.schoolList);
const { loading: loadingSchools, schools, error: errorSchools } = schoolsList;

const coursesList = useSelector((state) => state.courseList);
const { loading: loadingCourses, courses, error: errorCourses } = coursesList;


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
              <h1>STUDENT ADMISSION FORM</h1>
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
  <Select 
  onChange={(value) => {
    setSchoolSelect(value);
    console.log("scjool df ",schoolselected);
  }}
  loading={loadingSchools}>
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
  <Select 
    onChange={(value) => {
      setcourse(value);
      console.log("course is ",courseselected);
    }}
  
  loading={loadingCourses}>
  {courses && courses
  .filter(course => course.school._id === schoolselected)
  .map((course) => (
    <Select.Option key={course._id} value={course._id}>
      {course.name}
    </Select.Option>
))}

  </Select>
</Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
  label="Mode Of Study"
  name="mos"
  rules={[
    {
      required: true,
      message: 'Please select the Mode of Study!',
    },
  ]}
>
  <Select >
    <Select.Option key="full_time" value="full_time">
     Full Time
    </Select.Option>

    <Select.Option key="dlm" value="dlm">
    Dynamic Learning Maps
    </Select.Option>

    <Select.Option key="part_time" value="part_time">
     Part Time
    </Select.Option>
  </Select>
</Form.Item>
                      </Col>

                      <Col md={6}>
                      <Form.Item
  label="Year Of Study"
  name="year_of_study"
  setYearofstudy
  rules={[
    {
      required: true,
      message: 'Please select the year of study!',
    },
  ]}
>
  <Select 
  onChange={(value) => {
    setYearofstudy(value);
    console.log("year of study is ",yearofstudyselected);
  }}

  >
    <Select.Option key="1" value="1">
     1
    </Select.Option>

    <Select.Option key="2" value="2">
     2
    </Select.Option>

    <Select.Option key="3" value="3">
      3
    </Select.Option>
    <Select.Option key="4" value="4">
      4
    </Select.Option>
    <Select.Option key="5" value="5">
      5
    </Select.Option>
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
          {
            min: 8,
            message: 'National ID must be at least 8 characters!',
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
          {
            min: 10,
            message: 'Phone number must be at least 10 characters!',
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

                    <div className="w-100 text-center">
              <h1>PARENT/GUARDIAN DETAILS</h1>
            </div>
   
            <Row gutter={[16, 16]}>
                    <Col span={6}>
                    <Form.Item
        label="Full Name"
        name="parentFullName"
        rules={[
          {
            required: true,
            message: 'Please input the parents name!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                    </Col>

                

                    <Col span={6}>
                    <Form.Item
        label="Relationship"
        name="relationship"
        rules={[
          {
            required: true,
            message: 'Please enter the relationship!',
          },
        ]}
      >
        <Input />
      </Form.Item>
                    </Col>

                    <Col md={6}>
                      <Form.Item
        label="Phone"
        name="parentPhone"
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
        label="Email"
        name="parentEmail"
        rules={[
          {
            required: true,
            message: 'Please input the Email!',
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
    
            </section>
            </div>
           
    
    
    </div>
    
        </div>

    
  );
};

export default AdmissionScreen;
