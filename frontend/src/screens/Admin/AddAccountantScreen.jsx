import React, { useState, useCallback } from 'react';
import { Form, Input, Select,  message,Row,Col } from 'antd'
import { useDispatch } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar'
import { createAccountant } from '../../actions/accountantActions';
import {useDropzone} from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import Topbar from './components/Topbar';
import {Button} from 'react-bootstrap'


const AddAccountant = () => {

  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();

  const location = useLocation();
  const { pathname } = location;

  const onFinish = async (values) => {

    console.log('Received values:', values);

    if (selectedImages.length > 0) {
      const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

      if (uploadedFileUrl !== null) {
        values.photo = uploadedFileUrl;
        values.userType = "Accountant"
    
      }
 
  };


         const dob = new Date(values.dob);
         const ageDiffMs = Date.now() - dob.getTime();
         const ageDate = new Date(ageDiffMs); // Epoch
         const age = Math.abs(ageDate.getUTCFullYear() - 1970);
       
      
         if (age < 18) {
           message.error('Accountant must be at least 18 years old.');
           return; 
         }
         
  dispatch(createAccountant(values))
  .then(() => {
    message.success('Accountant added successfully!');
  })
  .catch((error) => {
    message.error('Error adding accountant: ' + error.message);
  });
  }
  const [selectedImages, setSelectedImages] = useState([]);
   

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        acceptedFiles.forEach((file) => {
          setSelectedImages((prevState) => [...prevState, file]);
        });
      }, []);

      const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
    onDrop,
    accept: acceptedImageTypes.join(','), 
  });

  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">
<Topbar/>
      
      <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

    
      <Form
      name="addAccountantForm"
      onFinish={onFinish}
      layout="vertical"

      labelCol={{ span: 32 }}
      wrapperCol={{ span: 32 }}
    >
       <Row gutter={[16, 16]}>
                    <Col span={6}>
                            <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
      >
        <Input />
      </Form.Item>
      </Col>


<Col span={6}>
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter the first name!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

<Col span={6}>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter the last name!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

<Col span={6}>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select the gender!' }]}
      >
        <Select>
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>
      </Col>

<Col span={6}>
      <Form.Item
        label="National ID"
        name="nationalID"
        rules={[{ required: true, message: 'Please enter the national ID!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

<Col span={6}>
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: 'Please enter the date of birth!' }]}
      >
        <Input type="date" />
      </Form.Item>
      </Col>

<Col span={6}>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please enter the phone number!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

<Col span={6}>
<Form.Item
        label="Upload Accountant Photo"
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

      <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
        <Button type="primary" className="w-100" htmlType="submit">
          Add Accountant
        </Button>
      </Form.Item>
    </Form>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default AddAccountant;
