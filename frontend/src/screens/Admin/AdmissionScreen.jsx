import React, { useCallback, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Upload, message, Col, Row, Card, Space, Typography, Divider, Avatar, Badge, Steps } from 'antd';
import { UploadOutlined, UserOutlined, TeamOutlined, BookOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar'
import { useSelector, useDispatch } from 'react-redux';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import { createStudent } from '../../actions/studentActions';
import Topbar from './components/Topbar';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import './AdmissionScreen.css'; // We'll create this CSS file

const { Option } = Select;
const { Title, Text } = Typography;

const AdmissionScreen = () => {
  const [schoolselected, setSchoolSelect] = useState(null);
  const [yearofstudyselected, setYearofstudy] = useState(null);
  const [courseselected, setcourse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onFinish = async (values) => {
    console.log('Received values:', values);

    const generateUniqueId = () => {
      return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const admissionNumber = `${schoolselected}-${yearofstudyselected}-${courseselected}-${generateUniqueId()}`;
    console.log("Admission Number:", admissionNumber);

    const dob = new Date(values.dob);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      message.error('Student must be at least 18 years old.');
      return;
    }

    const formattedParents = [{
      fullName: values.parentFullName,
      phone: values.parentPhone,
      email: values.parentEmail,
    }];

    const dataToSend = {
      ...values,
      parents: formattedParents,
    };

    if (selectedImages.length > 0) {
      const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));

      if (uploadedFileUrl !== null) {
        values.photo = uploadedFileUrl;
        values.userType = "student";
        dispatch(createStudent(values))
          .then(() => {
            message.success('🎉 Student added successfully!');
            history.push('/admin/allStudents');
          })
          .catch((error) => {
            console.log('Error adding student:', error);
            message.error('Failed to add student. Please try again.');
          });
      } else {
        message.error('Error uploading file');
      }
    } else {
      dispatch(createStudent(dataToSend)).then((response) => {
        console.log("response is ", response);
        if (response.message) {
          message.success(response.message);
        } else {
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

  const steps = [
    {
      title: 'Personal Info',
      icon: <UserOutlined />,
    },
    {
      title: 'Academic Info',
      icon: <BookOutlined />,
    },
    {
      title: 'Parent Details',
      icon: <TeamOutlined />,
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
              <div className="pt-3 w-100">
                <Card 
                  style={{ 
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  }}
                >
                  <div className="text-center text-white">
                    <Avatar 
                      size={64} 
                      icon={<UserOutlined />} 
                      style={{ 
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid white',
                        marginBottom: '10px'
                      }} 
                    />
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                      🎓 Student Admission Form
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                      Please fill in all required fields to register a new student
                    </Text>
                    <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                    <Steps 
                      current={currentStep} 
                      items={steps}
                      onChange={setCurrentStep}
                      style={{ 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        background: 'transparent'
                      }}
                    />
                  </div>
                </Card>

                <Card 
                  style={{ 
                    marginTop: '24px',
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                >
                  <Form
                    name="admissionForm"
                    onFinish={onFinish}
                    layout="vertical"
                    labelCol={{ span: 32 }}
                    wrapperCol={{ span: 32 }}
                  >
                    <div style={{ display: currentStep === 0 ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <UserOutlined style={{ color: '#667eea' }} />
                            <span>Personal Information</span>
                            <Badge count="Required" style={{ backgroundColor: '#52c41a' }} />
                          </Space>
                        }
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={6}>
                            <Form.Item
                              label={<><UserOutlined /> First Name</>}
                              name="firstName"
                              rules={[{ required: true, message: 'Please input the first name!' }]}
                            >
                              <Input placeholder="Enter first name" size="large" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><UserOutlined /> Last Name</>}
                              name="lastName"
                              rules={[{ required: true, message: 'Please input the last name!' }]}
                            >
                              <Input placeholder="Enter last name" size="large" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><IdcardOutlined /> Gender</>}
                              name="gender"
                              rules={[{ required: true, message: 'Please select the gender!' }]}
                            >
                              <Select placeholder="Select gender" size="large">
                                <Option value="male">👨 Male</Option>
                                <Option value="female">👩 Female</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label={<><CalendarOutlined /> Date of Birth</>}
                              name="dob"
                              rules={[{ required: true, message: 'Please select the date of birth!' }]}
                            >
                              <DatePicker format="DD/MM/YYYY" size="large" style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label="Religion"
                              name="religion"
                              rules={[{ required: true, message: 'Please select the religion!' }]}
                            >
                              <Select placeholder="Select religion" size="large">
                                <Option value="islam">🕌 Islam</Option>
                                <Option value="hindu">🕉️ Hindu</Option>
                                <Option value="christian">⛪ Christian</Option>
                                <Option value="buddish">☸️ Buddish</Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label={<><MailOutlined /> Email</>}
                              name="email"
                              rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                              ]}
                            >
                              <Input placeholder="Enter email address" size="large" />
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label={<><IdcardOutlined /> National ID</>}
                              name="nationalID"
                              rules={[
                                { required: true, message: 'Please input the National Number!' },
                                { min: 8, message: 'National ID must be at least 8 characters!' },
                              ]}
                            >
                              <Input placeholder="Enter National ID" size="large" />
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label={<><PhoneOutlined /> Phone</>}
                              name="phone"
                              rules={[
                                { required: true, message: 'Please input the Phone Number!' },
                                { min: 10, message: 'Phone number must be at least 10 characters!' },
                              ]}
                            >
                              <Input placeholder="Enter phone number" size="large" />
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
                              <div className='drop-zone-container' style={{ border: '2px dashed #d9d9d9', borderRadius: '10px', padding: '20px', textAlign: 'center', background: '#fafafa' }}>
                                <div className='dropzone' {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  {isDragActive ? (
                                    <p>📥 Drop file(s) here ...</p>
                                  ) : (
                                    <p>📤 Drag and drop file(s) here, or click to select files</p>
                                  )}
                                </div>
                                <div className='images' style={{ marginTop: '10px' }}>
                                  {selectedImages.length > 0 &&
                                    selectedImages.map((image, index) => (
                                      <img 
                                        src={`${URL.createObjectURL(image)}`} 
                                        key={index} 
                                        alt="Preview" 
                                        style={{ 
                                          maxWidth: '100px', 
                                          maxHeight: '100px', 
                                          borderRadius: '10px',
                                          border: '2px solid #667eea'
                                        }} 
                                      />
                                    ))}
                                </div>
                              </div>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </div>

                    <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <BookOutlined style={{ color: '#667eea' }} />
                            <span>Academic Information</span>
                            <Badge count="Required" style={{ backgroundColor: '#52c41a' }} />
                          </Space>
                        }
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col md={6}>
                            <Form.Item
                              label="School"
                              name="school"
                              rules={[{ required: true, message: 'Please select the school!' }]}
                            >
                              <Select 
                                placeholder="Select school"
                                size="large"
                                onChange={(value) => {
                                  setSchoolSelect(value);
                                  console.log("school selected ", schoolselected);
                                }}
                                loading={loadingSchools}
                              >
                                {schools && schools.map((school) => (
                                  <Option key={school._id} value={school._id}>
                                    🏫 {school.name}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label="Course"
                              name="course"
                              rules={[{ required: true, message: 'Please select the course!' }]}
                            >
                              <Select 
                                placeholder="Select course"
                                size="large"
                                onChange={(value) => {
                                  setcourse(value);
                                  console.log("course is ", courseselected);
                                }}
                                loading={loadingCourses}
                              >
                                {courses && courses
                                  .filter(course => course.school._id === schoolselected)
                                  .map((course) => (
                                    <Select.Option key={course._id} value={course._id}>
                                      📚 {course.name}
                                    </Select.Option>
                                  ))}
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label="Mode of Study"
                              name="mos"
                              rules={[{ required: true, message: 'Please select the Mode of Study!' }]}
                            >
                              <Select placeholder="Select mode of study" size="large">
                                <Select.Option key="full_time" value="full_time">
                                  ⏰ Full Time
                                </Select.Option>
                                <Select.Option key="dlm" value="dlm">
                                  🌐 DLM
                                </Select.Option>
                                <Select.Option key="part_time" value="part_time">
                                  ⏳ Part Time
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label="Year of Study"
                              name="year_of_study"
                              rules={[{ required: true, message: 'Please select the year of study!' }]}
                            >
                              <Select 
                                placeholder="Select year"
                                size="large"
                                onChange={(value) => {
                                  setYearofstudy(value);
                                  console.log("year of study is ", yearofstudyselected);
                                }}
                              >
                                <Select.Option key="1" value="1">📖 Year 1</Select.Option>
                                <Select.Option key="2" value="2">📗 Year 2</Select.Option>
                                <Select.Option key="3" value="3">📘 Year 3</Select.Option>
                                <Select.Option key="4" value="4">📙 Year 4</Select.Option>
                                <Select.Option key="5" value="5">📕 Year 5</Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </div>

                    <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <TeamOutlined style={{ color: '#667eea' }} />
                            <span>Parent/Guardian Details</span>
                            <Badge count="Required" style={{ backgroundColor: '#52c41a' }} />
                          </Space>
                        }
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={6}>
                            <Form.Item
                              label={<><UserOutlined /> Full Name</>}
                              name="parentFullName"
                              rules={[{ required: true, message: 'Please input the parents name!' }]}
                            >
                              <Input placeholder="Enter parent's full name" size="large" />
                            </Form.Item>
                          </Col>

                          <Col span={6}>
                            <Form.Item
                              label="Relationship"
                              name="relationship"
                              rules={[{ required: true, message: 'Please enter the relationship!' }]}
                            >
                              <Input placeholder="e.g., Father, Mother, Guardian" size="large" />
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label={<><PhoneOutlined /> Phone</>}
                              name="parentPhone"
                              rules={[{ required: true, message: 'Please input the Phone Number!' }]}
                            >
                              <Input placeholder="Enter parent's phone" size="large" />
                            </Form.Item>
                          </Col>

                          <Col md={6}>
                            <Form.Item
                              label={<><MailOutlined /> Email</>}
                              name="parentEmail"
                              rules={[
                                { required: true, message: 'Please input the Email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                              ]}
                            >
                              <Input placeholder="Enter parent's email" size="large" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    </div>

                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button 
                          variant="secondary" 
                          className="w-100" 
                          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                          style={{ display: currentStep > 0 ? 'block' : 'none' }}
                        >
                          ← Previous
                        </Button>
                      </Col>
                      <Col span={12}>
                        {currentStep < 2 ? (
                          <Button 
                            variant="primary" 
                            className="w-100" 
                            onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
                          >
                            Next →
                          </Button>
                        ) : (
                          <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                            <Button 
                              type="primary" 
                              className="w-100" 
                              htmlType="submit"
                              style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none'
                              }}
                            >
                              <SaveOutlined /> Submit Application
                            </Button>
                          </Form.Item>
                        )}
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

export default AdmissionScreen;