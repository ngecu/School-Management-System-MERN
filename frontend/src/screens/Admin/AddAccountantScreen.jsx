import React, { useState, useCallback } from 'react';
import { Form, Input, Select, message, Row, Col, Card, Typography, Space, Avatar, Steps, Divider } from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  IdcardOutlined, 
  CalendarOutlined,
  TeamOutlined,
  UploadOutlined,
  SaveOutlined,
  RollbackOutlined,
  CloudUploadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar';
import { createAccountant } from '../../actions/accountantActions';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../actions/cloudinaryAtions';
import Topbar from './components/Topbar';
import { Button } from 'react-bootstrap';
import './AddAccountant.css';

const { Title, Text } = Typography;
const { Option } = Select;

const AddAccountant = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const [currentStep, setCurrentStep] = useState(0);

  const onFinish = async (values) => {
    console.log('Received values:', values);

    if (selectedImages.length > 0) {
      const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

      if (uploadedFileUrl !== null) {
        values.photo = uploadedFileUrl;
        values.userType = "Accountant";
      }
    }

    const dob = new Date(values.dob);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      message.error('Accountant must be at least 18 years old.');
      return;
    }

    try {
      await dispatch(createAccountant(values));
      message.success('🎉 Accountant added successfully!');
      history.push('/admin/allAccountants');
    } catch (error) {
      message.error('Error adding accountant: ' + error.message);
    }
  };

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

  const handleCancel = () => {
    history.push('/admin/allAccountants');
  };

  const steps = [
    {
      title: 'Personal Info',
      icon: <UserOutlined />,
    },
    {
      title: 'Contact & Photo',
      icon: <UploadOutlined />,
    },
  ];

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper" style={{ background: '#f0f2f5' }}>
          <section className="content">
            <div className="container-fluid">
              <div className="pt-3">
                {/* Header Card */}
                <Card 
                  style={{ 
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    marginBottom: '24px'
                  }}
                >
                  <div className="text-center text-white">
                    <Avatar 
                      size={64} 
                      icon={<TeamOutlined />} 
                      style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid white',
                        marginBottom: '10px'
                      }} 
                    />
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                      👤 Add New Accountant
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Fill in the details below to register a new accountant
                    </Text>
                    <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                    <Steps 
                      current={currentStep} 
                      items={steps}
                      onChange={setCurrentStep}
                      style={{ 
                        maxWidth: '400px', 
                        margin: '0 auto',
                        background: 'transparent'
                      }}
                    />
                  </div>
                </Card>

                {/* Form Card */}
                <Card 
                  style={{ 
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                >
                  <Form
                    name="addAccountantForm"
                    onFinish={onFinish}
                    layout="vertical"
                    labelCol={{ span: 32 }}
                    wrapperCol={{ span: 32 }}
                  >
                    {/* Step 1: Personal Information */}
                    <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <UserOutlined style={{ color: '#667eea' }} />
                            <span>Personal Information</span>
                          </Space>
                        }
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={6}>
                            <Form.Item
                              label={<><MailOutlined /> Email</>}
                              name="email"
                              rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            >
                              <Input size="large" placeholder="Enter email address" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><UserOutlined /> First Name</>}
                              name="firstName"
                              rules={[{ required: true, message: 'Please enter the first name!' }]}
                            >
                              <Input size="large" placeholder="Enter first name" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><UserOutlined /> Last Name</>}
                              name="lastName"
                              rules={[{ required: true, message: 'Please enter the last name!' }]}
                            >
                              <Input size="large" placeholder="Enter last name" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><TeamOutlined /> Gender</>}
                              name="gender"
                              rules={[{ required: true, message: 'Please select the gender!' }]}
                            >
                              <Select size="large" placeholder="Select gender">
                                <Option value="male">👨 Male</Option>
                                <Option value="female">👩 Female</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><IdcardOutlined /> National ID</>}
                              name="nationalID"
                              rules={[
                                { required: true, message: 'Please enter the national ID!' },
                                { min: 8, message: 'National ID must be at least 8 characters!' }
                              ]}
                            >
                              <Input size="large" placeholder="Enter national ID" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><CalendarOutlined /> Date of Birth</>}
                              name="dob"
                              rules={[{ required: true, message: 'Please enter the date of birth!' }]}
                            >
                              <Input size="large" type="date" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><PhoneOutlined /> Phone</>}
                              name="phone"
                              rules={[
                                { required: true, message: 'Please enter the phone number!' },
                                { min: 10, message: 'Phone number must be at least 10 characters!' }
                              ]}
                            >
                              <Input size="large" placeholder="Enter phone number" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </div>

                    {/* Step 2: Photo Upload */}
                    <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <CloudUploadOutlined style={{ color: '#667eea' }} />
                            <span>Photo Upload</span>
                          </Space>
                        }
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Form.Item
                              label="Upload Accountant Photo"
                              name="photo"
                              valuePropName="fileList"
                              getValueFromEvent={normFile}
                              extra={
                                <Text type="secondary">
                                  Please upload a photo with dimensions 150px X 150px.
                                  Supported formats: JPG, PNG, GIF
                                </Text>
                              }
                            >
                              <div className='drop-zone-container'>
                                <div 
                                  className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`} 
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <CloudUploadOutlined style={{ fontSize: '48px', color: '#667eea', marginBottom: '16px' }} />
                                  {isDragActive ? (
                                    <p>📥 Drop file(s) here ...</p>
                                  ) : (
                                    <>
                                      <p>📤 Drag and drop file(s) here, or click to select files</p>
                                      <Text type="secondary" style={{ fontSize: '12px' }}>
                                        Maximum file size: 5MB
                                      </Text>
                                    </>
                                  )}
                                </div>

                                <div className='images-preview'>
                                  {selectedImages.length > 0 && (
                                    <>
                                      <Divider>Preview</Divider>
                                      <div className='images-grid'>
                                        {selectedImages.map((image, index) => (
                                          <div key={index} className='image-item'>
                                            <img 
                                              src={`${URL.createObjectURL(image)}`} 
                                              alt={`Upload ${index + 1}`}
                                            />
                                            <div className="image-label">
                                              <CheckCircleOutlined style={{ color: '#52c41a' }} />
                                              <span>Uploaded</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </div>

                    {/* Navigation Buttons */}
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        {currentStep > 0 && (
                          <Button 
                            variant="secondary" 
                            className="w-100" 
                            onClick={() => setCurrentStep(currentStep - 1)}
                            size="lg"
                          >
                            <RollbackOutlined /> Previous
                          </Button>
                        )}
                      </Col>
                      <Col span={12}>
                        {currentStep < 1 ? (
                          <Button 
                            variant="primary" 
                            className="w-100" 
                            onClick={() => setCurrentStep(currentStep + 1)}
                            size="lg"
                          >
                            Next →
                          </Button>
                        ) : (
                          <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                            <Button 
                              type="primary" 
                              className="w-100 submit-btn" 
                              htmlType="submit"
                              size="lg"
                            >
                              <SaveOutlined /> Add Accountant
                            </Button>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>

                    {/* Cancel Button */}
                    <Row className="mt-3">
                      <Col span={24}>
                        <Button 
                          variant="secondary" 
                          className="w-100" 
                          onClick={handleCancel}
                          size="lg"
                          style={{ background: '#f0f0f0', border: 'none' }}
                        >
                          <RollbackOutlined /> Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddAccountant;