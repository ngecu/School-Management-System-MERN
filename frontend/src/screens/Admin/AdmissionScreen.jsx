import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Upload, message, Col, Row, Card, Space, Typography, Divider, Avatar, Badge, Steps, Spin, Alert } from 'antd';
import { UploadOutlined, UserOutlined, TeamOutlined, BookOutlined, CalendarOutlined, PhoneOutlined, MailOutlined, IdcardOutlined, PlusOutlined, SaveOutlined, LoadingOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar'
import { useSelector, useDispatch } from 'react-redux';
import { listSchools } from '../../actions/schoolActions';
import { listCourses } from '../../actions/courseActions';
import { createStudent } from '../../actions/studentActions';
import Topbar from './components/Topbar';
import { useDropzone } from 'react-dropzone'
import { uploadFile } from '../../actions/cloudinaryAtions';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import './AdmissionScreen.css';

const { Option } = Select;
const { Title, Text } = Typography;

const AdmissionScreen = () => {
  const [schoolselected, setSchoolSelect] = useState(null);
  const [yearofstudyselected, setYearofstudy] = useState(null);
  const [courseselected, setcourse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values) => {
    console.log('Received values:', values);
    setIsSubmitting(true);
    setSubmitStatus(null);

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
      setIsSubmitting(false);
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
      admissionNumber: admissionNumber,
    };

    try {
      if (selectedImages.length > 0) {
        const uploadedFileUrl = await dispatch(uploadFile(selectedImages[0]));
        
        if (uploadedFileUrl !== null) {
          values.photo = uploadedFileUrl;
          values.userType = "student";
          
          const result = await dispatch(createStudent(values));
          console.log('Student creation result:', result);
          
          if (result && result.message) {
            message.success('🎉 Student added successfully!');
            setSubmitStatus('success');
            form.resetFields();
            setSelectedImages([]);
            setSchoolSelect(null);
            setYearofstudy(null);
            setcourse(null);
            setCurrentStep(0);
            setIsSubmitting(false);
            
            setTimeout(() => {
              history.push('/admin/allStudents');
            }, 2000);
          } else if (result && result.error) {
            message.error(result.error);
            setSubmitStatus('error');
            setIsSubmitting(false);
          }
        } else {
          message.error('Error uploading file');
          setSubmitStatus('error');
          setIsSubmitting(false);
        }
      } else {
        const result = await dispatch(createStudent(dataToSend));
        console.log("response is ", result);
        
        if (result && result.message) {
          message.success(result.message);
          setSubmitStatus('success');
          form.resetFields();
          setSelectedImages([]);
          setSchoolSelect(null);
          setYearofstudy(null);
          setcourse(null);
          setCurrentStep(0);
          setIsSubmitting(false);
          
          setTimeout(() => {
            history.push('/admin/allStudents');
          }, 2000);
        } else if (result && result.error) {
          message.error(result.error);
          setSubmitStatus('error');
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error(error.message || 'Failed to add student. Please try again.');
      setSubmitStatus('error');
      setIsSubmitting(false);
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
  const { loading: loadingSchools, error: errorSchools } = schoolsList;

  const schools = [
        {
            "_id": "65cca4702f0cb15a0beb4403",
            "name": "School of Medicine",
            "courses": [
                {
                    "_id": "65cca47a2f0cb15a0beb44f3",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.086Z",
                    "updatedAt": "2024-02-14T11:31:06.086Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f4",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.086Z",
                    "updatedAt": "2024-02-14T11:31:06.086Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f5",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.086Z",
                    "updatedAt": "2024-02-14T11:31:06.086Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f6",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.086Z",
                    "updatedAt": "2024-02-14T11:31:06.086Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f7",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.086Z",
                    "updatedAt": "2024-02-14T11:31:06.086Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f8",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44f9",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44fa",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44fb",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44fc",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44fd",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44fe",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb44ff",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb4500",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                },
                {
                    "_id": "65cca47a2f0cb15a0beb4501",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb4403",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:06.087Z",
                    "updatedAt": "2024-02-14T11:31:06.087Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:06.418Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43f8",
            "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
            "courses": [
                {
                    "_id": "65cca4722f0cb15a0beb4438",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.612Z",
                    "updatedAt": "2024-02-14T11:30:58.612Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4439",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.612Z",
                    "updatedAt": "2024-02-14T11:30:58.612Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443a",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.612Z",
                    "updatedAt": "2024-02-14T11:30:58.612Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443b",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.612Z",
                    "updatedAt": "2024-02-14T11:30:58.612Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443c",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443d",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443e",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb443f",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4440",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4441",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4442",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4443",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.613Z",
                    "updatedAt": "2024-02-14T11:30:58.613Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4444",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.614Z",
                    "updatedAt": "2024-02-14T11:30:58.614Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4445",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.614Z",
                    "updatedAt": "2024-02-14T11:30:58.614Z"
                },
                {
                    "_id": "65cca4722f0cb15a0beb4446",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43f8",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:58.614Z",
                    "updatedAt": "2024-02-14T11:30:58.614Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:30:58.947Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43f6",
            "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
            "courses": [
                {
                    "_id": "65cca4712f0cb15a0beb4416",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4417",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4418",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4419",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441a",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441b",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441c",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441d",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.275Z",
                    "updatedAt": "2024-02-14T11:30:57.275Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441e",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb441f",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4420",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4421",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4422",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4423",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4424",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43f6",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.276Z",
                    "updatedAt": "2024-02-14T11:30:57.276Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:30:57.611Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43fc",
            "name": "School of Computing and Information Technology(SCIT)",
            "courses": [
                {
                    "_id": "65cca4752f0cb15a0beb447c",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb447d",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb447e",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb447f",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4480",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4481",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4482",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4483",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4484",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4485",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4486",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4487",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4488",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4489",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.302Z",
                    "updatedAt": "2024-02-14T11:31:01.302Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb448a",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43fc",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.303Z",
                    "updatedAt": "2024-02-14T11:31:01.303Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:31:01.634Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb4402",
            "name": "School of Biological Sciences",
            "courses": [
                {
                    "_id": "65cca4792f0cb15a0beb44e2",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e3",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e4",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e5",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e6",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e7",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e8",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44e9",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44ea",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44eb",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.332Z",
                    "updatedAt": "2024-02-14T11:31:05.332Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44ec",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.333Z",
                    "updatedAt": "2024-02-14T11:31:05.333Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44ed",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.333Z",
                    "updatedAt": "2024-02-14T11:31:05.333Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44ee",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.333Z",
                    "updatedAt": "2024-02-14T11:31:05.333Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44ef",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.333Z",
                    "updatedAt": "2024-02-14T11:31:05.333Z"
                },
                {
                    "_id": "65cca4792f0cb15a0beb44f0",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb4402",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:05.334Z",
                    "updatedAt": "2024-02-14T11:31:05.334Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:05.728Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43f7",
            "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
            "courses": [
                {
                    "_id": "65cca4712f0cb15a0beb4427",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4428",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4429",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442a",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442b",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442c",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442d",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442e",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb442f",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.938Z",
                    "updatedAt": "2024-02-14T11:30:57.938Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4430",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4431",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4432",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4433",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4434",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                },
                {
                    "_id": "65cca4712f0cb15a0beb4435",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43f7",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:57.939Z",
                    "updatedAt": "2024-02-14T11:30:57.939Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:30:58.274Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43ff",
            "name": "School of Communications & Development Studies (SCDS)",
            "courses": [
                {
                    "_id": "65cca4772f0cb15a0beb44af",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.300Z",
                    "updatedAt": "2024-02-14T11:31:03.300Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b0",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.300Z",
                    "updatedAt": "2024-02-14T11:31:03.300Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b1",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b2",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b3",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b4",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b5",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b6",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b7",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b8",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44b9",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44ba",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.301Z",
                    "updatedAt": "2024-02-14T11:31:03.301Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44bb",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.302Z",
                    "updatedAt": "2024-02-14T11:31:03.302Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44bc",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.302Z",
                    "updatedAt": "2024-02-14T11:31:03.302Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44bd",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43ff",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.302Z",
                    "updatedAt": "2024-02-14T11:31:03.302Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:03.639Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43fb",
            "name": "School of Mathematical Sciences (SMS)",
            "courses": [
                {
                    "_id": "65cca4742f0cb15a0beb446b",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.628Z",
                    "updatedAt": "2024-02-14T11:31:00.628Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb446c",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.628Z",
                    "updatedAt": "2024-02-14T11:31:00.628Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb446d",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.628Z",
                    "updatedAt": "2024-02-14T11:31:00.628Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb446e",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb446f",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4470",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4471",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4472",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4473",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4474",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4475",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4476",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4477",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4478",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                },
                {
                    "_id": "65cca4742f0cb15a0beb4479",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43fb",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:00.629Z",
                    "updatedAt": "2024-02-14T11:31:00.629Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:31:00.968Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb4401",
            "name": "School of Open, Distance and eLearning (SODeL)",
            "courses": [
                {
                    "_id": "65cca4782f0cb15a0beb44d1",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d2",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d3",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d4",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d5",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d6",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d7",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d8",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44d9",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44da",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44db",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44dc",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.634Z",
                    "updatedAt": "2024-02-14T11:31:04.634Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44dd",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.635Z",
                    "updatedAt": "2024-02-14T11:31:04.635Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44de",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.635Z",
                    "updatedAt": "2024-02-14T11:31:04.635Z"
                },
                {
                    "_id": "65cca4782f0cb15a0beb44df",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb4401",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:04.635Z",
                    "updatedAt": "2024-02-14T11:31:04.635Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:05.000Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43fd",
            "name": "School of Business",
            "courses": [
                {
                    "_id": "65cca4752f0cb15a0beb448d",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.961Z",
                    "updatedAt": "2024-02-14T11:31:01.961Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb448e",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.961Z",
                    "updatedAt": "2024-02-14T11:31:01.961Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb448f",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.961Z",
                    "updatedAt": "2024-02-14T11:31:01.961Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4490",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4491",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4492",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4493",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4494",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4495",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4496",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4497",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.962Z",
                    "updatedAt": "2024-02-14T11:31:01.962Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4498",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.963Z",
                    "updatedAt": "2024-02-14T11:31:01.963Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb4499",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.963Z",
                    "updatedAt": "2024-02-14T11:31:01.963Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb449a",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.963Z",
                    "updatedAt": "2024-02-14T11:31:01.963Z"
                },
                {
                    "_id": "65cca4752f0cb15a0beb449b",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43fd",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:01.963Z",
                    "updatedAt": "2024-02-14T11:31:01.963Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:31:02.296Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb4400",
            "name": "School of Biosystems and Environmental Engineering (SOBEE)",
            "courses": [
                {
                    "_id": "65cca4772f0cb15a0beb44c0",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c1",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c2",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c3",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c4",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c5",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c6",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c7",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c8",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44c9",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44ca",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44cb",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44cc",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44cd",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                },
                {
                    "_id": "65cca4772f0cb15a0beb44ce",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb4400",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:03.969Z",
                    "updatedAt": "2024-02-14T11:31:03.969Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:04.297Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43fa",
            "name": "School of Physical Sciences (SPS)",
            "courses": [
                {
                    "_id": "65cca4732f0cb15a0beb445a",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.969Z",
                    "updatedAt": "2024-02-14T11:30:59.969Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb445b",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.969Z",
                    "updatedAt": "2024-02-14T11:30:59.969Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb445c",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.969Z",
                    "updatedAt": "2024-02-14T11:30:59.969Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb445d",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.969Z",
                    "updatedAt": "2024-02-14T11:30:59.969Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb445e",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb445f",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4460",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4461",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4462",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4463",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4464",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4465",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4466",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.970Z",
                    "updatedAt": "2024-02-14T11:30:59.970Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4467",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.971Z",
                    "updatedAt": "2024-02-14T11:30:59.971Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4468",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43fa",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.971Z",
                    "updatedAt": "2024-02-14T11:30:59.971Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:31:00.298Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43f9",
            "name": "School of Law",
            "courses": [
                {
                    "_id": "65cca4732f0cb15a0beb4449",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.292Z",
                    "updatedAt": "2024-02-14T11:30:59.292Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444a",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444b",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444c",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444d",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444e",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb444f",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.293Z",
                    "updatedAt": "2024-02-14T11:30:59.293Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4450",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4451",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4452",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4453",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4454",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4455",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4456",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                },
                {
                    "_id": "65cca4732f0cb15a0beb4457",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43f9",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:59.294Z",
                    "updatedAt": "2024-02-14T11:30:59.294Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.241Z",
            "updatedAt": "2024-02-14T11:30:59.636Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43fe",
            "name": "School of Entrepreneurship, Procurement & Management",
            "courses": [
                {
                    "_id": "65cca4762f0cb15a0beb449e",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.628Z",
                    "updatedAt": "2024-02-14T11:31:02.628Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb449f",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a0",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a1",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a2",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a3",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a4",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a5",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a6",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.629Z",
                    "updatedAt": "2024-02-14T11:31:02.629Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a7",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a8",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44a9",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44aa",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44ab",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                },
                {
                    "_id": "65cca4762f0cb15a0beb44ac",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43fe",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:31:02.630Z",
                    "updatedAt": "2024-02-14T11:31:02.630Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.242Z",
            "updatedAt": "2024-02-14T11:31:02.958Z"
        },
        {
            "_id": "65cca4702f0cb15a0beb43f5",
            "name": "School of Architecture and Building Science",
            "courses": [
                {
                    "_id": "65cca4702f0cb15a0beb4405",
                    "name": "Architectural Design",
                    "description": "Learn about architectural design",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.588Z",
                    "updatedAt": "2024-02-14T11:30:56.588Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4406",
                    "name": "Mechanical Engineering",
                    "description": "Study mechanical engineering principles",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.588Z",
                    "updatedAt": "2024-02-14T11:30:56.588Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4407",
                    "name": "Civil Engineering",
                    "description": "Explore civil engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4408",
                    "name": "Electrical Engineering",
                    "description": "Learn about electrical engineering",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4409",
                    "name": "Criminal Law",
                    "description": "Study criminal law and justice",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440a",
                    "name": "Physics",
                    "description": "Explore principles of physics",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440b",
                    "name": "Mathematics",
                    "description": "Study mathematics and its applications",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440c",
                    "name": "Computer Science",
                    "description": "Explore computer science and programming",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440d",
                    "name": "Business Administration",
                    "description": "Learn about business management",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.589Z",
                    "updatedAt": "2024-02-14T11:30:56.589Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440e",
                    "name": "Entrepreneurship",
                    "description": "Study entrepreneurship principles",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb440f",
                    "name": "Communication Studies",
                    "description": "Explore communication and media studies",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4410",
                    "name": "Environmental Engineering",
                    "description": "Study environmental engineering concepts",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4411",
                    "name": "Online Learning Strategies",
                    "description": "Learn about online education strategies",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4412",
                    "name": "Biology",
                    "description": "Explore principles of biology",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                },
                {
                    "_id": "65cca4702f0cb15a0beb4413",
                    "name": "General Medicine",
                    "description": "Study general medicine and healthcare",
                    "school": "65cca4702f0cb15a0beb43f5",
                    "units": [],
                    "__v": 0,
                    "createdAt": "2024-02-14T11:30:56.590Z",
                    "updatedAt": "2024-02-14T11:30:56.590Z"
                }
            ],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.240Z",
            "updatedAt": "2024-02-14T11:30:56.932Z"
        }
    ]

  const coursesList = useSelector((state) => state.courseList);
  const { loading: loadingCourses, error: errorCourses } = coursesList;

  const courses =  [
        {
            "_id": "65cca4702f0cb15a0beb4409",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442f",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4443",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445b",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.969Z",
            "updatedAt": "2024-02-14T11:30:59.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b4",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b5",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb4501",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440e",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4422",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4454",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445a",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.969Z",
            "updatedAt": "2024-02-14T11:30:59.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4461",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4477",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4472",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb449f",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a5",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44aa",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d5",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d9",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44df",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.635Z",
            "updatedAt": "2024-02-14T11:31:04.635Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e2",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e9",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4405",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.588Z",
            "updatedAt": "2024-02-14T11:30:56.588Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440b",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440d",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4411",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440f",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4413",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4420",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442c",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442b",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442d",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4435",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4433",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443b",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.612Z",
            "updatedAt": "2024-02-14T11:30:58.612Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4440",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4446",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.614Z",
            "updatedAt": "2024-02-14T11:30:58.614Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4445",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.614Z",
            "updatedAt": "2024-02-14T11:30:58.614Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444f",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4451",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445d",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.969Z",
            "updatedAt": "2024-02-14T11:30:59.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4462",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4463",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb448a",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.303Z",
            "updatedAt": "2024-02-14T11:31:01.303Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb447f",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb448d",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.961Z",
            "updatedAt": "2024-02-14T11:31:01.961Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4491",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b0",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.300Z",
            "updatedAt": "2024-02-14T11:31:03.300Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b3",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c9",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c7",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e4",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e8",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44ef",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.333Z",
            "updatedAt": "2024-02-14T11:31:05.333Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44fc",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f7",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.086Z",
            "updatedAt": "2024-02-14T11:31:06.086Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44fd",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4412",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441e",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441a",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4434",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442a",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4439",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.612Z",
            "updatedAt": "2024-02-14T11:30:58.612Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443d",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443a",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.612Z",
            "updatedAt": "2024-02-14T11:30:58.612Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4455",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445e",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445f",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4471",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb446b",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.628Z",
            "updatedAt": "2024-02-14T11:31:00.628Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4470",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4478",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4494",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4496",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb448e",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.961Z",
            "updatedAt": "2024-02-14T11:31:01.961Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a7",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b8",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b6",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44cd",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c2",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44ce",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d8",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44dc",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d4",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d7",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44dd",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.635Z",
            "updatedAt": "2024-02-14T11:31:04.635Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e6",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44ea",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f3",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.086Z",
            "updatedAt": "2024-02-14T11:31:06.086Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44fa",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f6",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.086Z",
            "updatedAt": "2024-02-14T11:31:06.086Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441b",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441d",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4427",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4460",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb446c",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.628Z",
            "updatedAt": "2024-02-14T11:31:00.628Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4486",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b1",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44bb",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.302Z",
            "updatedAt": "2024-02-14T11:31:03.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44cc",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44eb",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441f",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4441",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443f",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444d",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb449b",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.963Z",
            "updatedAt": "2024-02-14T11:31:01.963Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b7",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e5",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4430",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4442",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4473",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb446e",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4482",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb447d",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4484",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4497",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb448f",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.961Z",
            "updatedAt": "2024-02-14T11:31:01.961Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a0",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44ac",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44af",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.300Z",
            "updatedAt": "2024-02-14T11:31:03.300Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c5",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c8",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d1",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d2",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44de",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.635Z",
            "updatedAt": "2024-02-14T11:31:04.635Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44f0",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.334Z",
            "updatedAt": "2024-02-14T11:31:05.334Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f9",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4416",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4417",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4419",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4421",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4429",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444b",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4464",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4465",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4468",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.971Z",
            "updatedAt": "2024-02-14T11:30:59.971Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4480",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb447c",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4481",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4498",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.963Z",
            "updatedAt": "2024-02-14T11:31:01.963Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb449e",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.628Z",
            "updatedAt": "2024-02-14T11:31:02.628Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a3",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a4",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a9",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a1",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44bc",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.302Z",
            "updatedAt": "2024-02-14T11:31:03.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44bd",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.302Z",
            "updatedAt": "2024-02-14T11:31:03.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44ca",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c1",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c4",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44ed",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.333Z",
            "updatedAt": "2024-02-14T11:31:05.333Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb441c",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4431",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4457",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb446f",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a8",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44ab",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.630Z",
            "updatedAt": "2024-02-14T11:31:02.630Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b9",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44cb",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f8",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440a",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4408",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4410",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.590Z",
            "updatedAt": "2024-02-14T11:30:56.590Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4444",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.614Z",
            "updatedAt": "2024-02-14T11:30:58.614Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb4438",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.612Z",
            "updatedAt": "2024-02-14T11:30:58.612Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4449",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.292Z",
            "updatedAt": "2024-02-14T11:30:59.292Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444c",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4474",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb447e",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4485",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4483",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb449a",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.963Z",
            "updatedAt": "2024-02-14T11:31:01.963Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4490",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a2",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c3",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e3",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44fe",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb4500",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb440c",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4418",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.275Z",
            "updatedAt": "2024-02-14T11:30:57.275Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4423",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4424",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f6",
                "name": "School of Mechanical, Manufacturing and Materials Engineering (SoMMME)",
                "courses": [
                    "65cca4712f0cb15a0beb4416",
                    "65cca4712f0cb15a0beb4417",
                    "65cca4712f0cb15a0beb4418",
                    "65cca4712f0cb15a0beb4419",
                    "65cca4712f0cb15a0beb441a",
                    "65cca4712f0cb15a0beb441b",
                    "65cca4712f0cb15a0beb441c",
                    "65cca4712f0cb15a0beb441d",
                    "65cca4712f0cb15a0beb441e",
                    "65cca4712f0cb15a0beb441f",
                    "65cca4712f0cb15a0beb4420",
                    "65cca4712f0cb15a0beb4421",
                    "65cca4712f0cb15a0beb4422",
                    "65cca4712f0cb15a0beb4423",
                    "65cca4712f0cb15a0beb4424"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:57.611Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.276Z",
            "updatedAt": "2024-02-14T11:30:57.276Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb442e",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4432",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.939Z",
            "updatedAt": "2024-02-14T11:30:57.939Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443c",
            "name": "Criminal Law",
            "description": "Study criminal law and justice",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4452",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444a",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb444e",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.293Z",
            "updatedAt": "2024-02-14T11:30:59.293Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4453",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4466",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.970Z",
            "updatedAt": "2024-02-14T11:30:59.970Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4476",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb446d",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.628Z",
            "updatedAt": "2024-02-14T11:31:00.628Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4475",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4487",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4488",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4489",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fc",
                "name": "School of Computing and Information Technology(SCIT)",
                "courses": [
                    "65cca4752f0cb15a0beb447c",
                    "65cca4752f0cb15a0beb447d",
                    "65cca4752f0cb15a0beb447e",
                    "65cca4752f0cb15a0beb447f",
                    "65cca4752f0cb15a0beb4480",
                    "65cca4752f0cb15a0beb4481",
                    "65cca4752f0cb15a0beb4482",
                    "65cca4752f0cb15a0beb4483",
                    "65cca4752f0cb15a0beb4484",
                    "65cca4752f0cb15a0beb4485",
                    "65cca4752f0cb15a0beb4486",
                    "65cca4752f0cb15a0beb4487",
                    "65cca4752f0cb15a0beb4488",
                    "65cca4752f0cb15a0beb4489",
                    "65cca4752f0cb15a0beb448a"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:01.634Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.302Z",
            "updatedAt": "2024-02-14T11:31:01.302Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4499",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.963Z",
            "updatedAt": "2024-02-14T11:31:01.963Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4492",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44ba",
            "name": "Environmental Engineering",
            "description": "Study environmental engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44b2",
            "name": "Electrical Engineering",
            "description": "Learn about electrical engineering",
            "school": {
                "_id": "65cca4702f0cb15a0beb43ff",
                "name": "School of Communications & Development Studies (SCDS)",
                "courses": [
                    "65cca4772f0cb15a0beb44af",
                    "65cca4772f0cb15a0beb44b0",
                    "65cca4772f0cb15a0beb44b1",
                    "65cca4772f0cb15a0beb44b2",
                    "65cca4772f0cb15a0beb44b3",
                    "65cca4772f0cb15a0beb44b4",
                    "65cca4772f0cb15a0beb44b5",
                    "65cca4772f0cb15a0beb44b6",
                    "65cca4772f0cb15a0beb44b7",
                    "65cca4772f0cb15a0beb44b8",
                    "65cca4772f0cb15a0beb44b9",
                    "65cca4772f0cb15a0beb44ba",
                    "65cca4772f0cb15a0beb44bb",
                    "65cca4772f0cb15a0beb44bc",
                    "65cca4772f0cb15a0beb44bd"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:03.639Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.301Z",
            "updatedAt": "2024-02-14T11:31:03.301Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c0",
            "name": "Architectural Design",
            "description": "Learn about architectural design",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d3",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44db",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44d6",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4782f0cb15a0beb44da",
            "name": "Entrepreneurship",
            "description": "Study entrepreneurship principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4401",
                "name": "School of Open, Distance and eLearning (SODeL)",
                "courses": [
                    "65cca4782f0cb15a0beb44d1",
                    "65cca4782f0cb15a0beb44d2",
                    "65cca4782f0cb15a0beb44d3",
                    "65cca4782f0cb15a0beb44d4",
                    "65cca4782f0cb15a0beb44d5",
                    "65cca4782f0cb15a0beb44d6",
                    "65cca4782f0cb15a0beb44d7",
                    "65cca4782f0cb15a0beb44d8",
                    "65cca4782f0cb15a0beb44d9",
                    "65cca4782f0cb15a0beb44da",
                    "65cca4782f0cb15a0beb44db",
                    "65cca4782f0cb15a0beb44dc",
                    "65cca4782f0cb15a0beb44dd",
                    "65cca4782f0cb15a0beb44de",
                    "65cca4782f0cb15a0beb44df"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.000Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:04.634Z",
            "updatedAt": "2024-02-14T11:31:04.634Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44e7",
            "name": "Physics",
            "description": "Explore principles of physics",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.332Z",
            "updatedAt": "2024-02-14T11:31:05.332Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44ee",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.333Z",
            "updatedAt": "2024-02-14T11:31:05.333Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4792f0cb15a0beb44ec",
            "name": "Communication Studies",
            "description": "Explore communication and media studies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4402",
                "name": "School of Biological Sciences",
                "courses": [
                    "65cca4792f0cb15a0beb44e2",
                    "65cca4792f0cb15a0beb44e3",
                    "65cca4792f0cb15a0beb44e4",
                    "65cca4792f0cb15a0beb44e5",
                    "65cca4792f0cb15a0beb44e6",
                    "65cca4792f0cb15a0beb44e7",
                    "65cca4792f0cb15a0beb44e8",
                    "65cca4792f0cb15a0beb44e9",
                    "65cca4792f0cb15a0beb44ea",
                    "65cca4792f0cb15a0beb44eb",
                    "65cca4792f0cb15a0beb44ec",
                    "65cca4792f0cb15a0beb44ed",
                    "65cca4792f0cb15a0beb44ee",
                    "65cca4792f0cb15a0beb44ef",
                    "65cca4792f0cb15a0beb44f0"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:05.728Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:05.333Z",
            "updatedAt": "2024-02-14T11:31:05.333Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f4",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.086Z",
            "updatedAt": "2024-02-14T11:31:06.086Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44f5",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.086Z",
            "updatedAt": "2024-02-14T11:31:06.086Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44ff",
            "name": "Online Learning Strategies",
            "description": "Learn about online education strategies",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4406",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.588Z",
            "updatedAt": "2024-02-14T11:30:56.588Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4702f0cb15a0beb4407",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f5",
                "name": "School of Architecture and Building Science",
                "courses": [
                    "65cca4702f0cb15a0beb4405",
                    "65cca4702f0cb15a0beb4406",
                    "65cca4702f0cb15a0beb4407",
                    "65cca4702f0cb15a0beb4408",
                    "65cca4702f0cb15a0beb4409",
                    "65cca4702f0cb15a0beb440a",
                    "65cca4702f0cb15a0beb440b",
                    "65cca4702f0cb15a0beb440c",
                    "65cca4702f0cb15a0beb440d",
                    "65cca4702f0cb15a0beb440e",
                    "65cca4702f0cb15a0beb440f",
                    "65cca4702f0cb15a0beb4410",
                    "65cca4702f0cb15a0beb4411",
                    "65cca4702f0cb15a0beb4412",
                    "65cca4702f0cb15a0beb4413"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.240Z",
                "updatedAt": "2024-02-14T11:30:56.932Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:56.589Z",
            "updatedAt": "2024-02-14T11:30:56.589Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4712f0cb15a0beb4428",
            "name": "Mechanical Engineering",
            "description": "Study mechanical engineering principles",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f7",
                "name": "School of Civil Engineering and Geomatic Engineering (SCEGE)",
                "courses": [
                    "65cca4712f0cb15a0beb4427",
                    "65cca4712f0cb15a0beb4428",
                    "65cca4712f0cb15a0beb4429",
                    "65cca4712f0cb15a0beb442a",
                    "65cca4712f0cb15a0beb442b",
                    "65cca4712f0cb15a0beb442c",
                    "65cca4712f0cb15a0beb442d",
                    "65cca4712f0cb15a0beb442e",
                    "65cca4712f0cb15a0beb442f",
                    "65cca4712f0cb15a0beb4430",
                    "65cca4712f0cb15a0beb4431",
                    "65cca4712f0cb15a0beb4432",
                    "65cca4712f0cb15a0beb4433",
                    "65cca4712f0cb15a0beb4434",
                    "65cca4712f0cb15a0beb4435"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.274Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:57.938Z",
            "updatedAt": "2024-02-14T11:30:57.938Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4722f0cb15a0beb443e",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f8",
                "name": "School of Electrical, Electronic & Information Engineering (SEEIE)",
                "courses": [
                    "65cca4722f0cb15a0beb4438",
                    "65cca4722f0cb15a0beb4439",
                    "65cca4722f0cb15a0beb443a",
                    "65cca4722f0cb15a0beb443b",
                    "65cca4722f0cb15a0beb443c",
                    "65cca4722f0cb15a0beb443d",
                    "65cca4722f0cb15a0beb443e",
                    "65cca4722f0cb15a0beb443f",
                    "65cca4722f0cb15a0beb4440",
                    "65cca4722f0cb15a0beb4441",
                    "65cca4722f0cb15a0beb4442",
                    "65cca4722f0cb15a0beb4443",
                    "65cca4722f0cb15a0beb4444",
                    "65cca4722f0cb15a0beb4445",
                    "65cca4722f0cb15a0beb4446"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:58.947Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:58.613Z",
            "updatedAt": "2024-02-14T11:30:58.613Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4450",
            "name": "Computer Science",
            "description": "Explore computer science and programming",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4456",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43f9",
                "name": "School of Law",
                "courses": [
                    "65cca4732f0cb15a0beb4449",
                    "65cca4732f0cb15a0beb444a",
                    "65cca4732f0cb15a0beb444b",
                    "65cca4732f0cb15a0beb444c",
                    "65cca4732f0cb15a0beb444d",
                    "65cca4732f0cb15a0beb444e",
                    "65cca4732f0cb15a0beb444f",
                    "65cca4732f0cb15a0beb4450",
                    "65cca4732f0cb15a0beb4451",
                    "65cca4732f0cb15a0beb4452",
                    "65cca4732f0cb15a0beb4453",
                    "65cca4732f0cb15a0beb4454",
                    "65cca4732f0cb15a0beb4455",
                    "65cca4732f0cb15a0beb4456",
                    "65cca4732f0cb15a0beb4457"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:30:59.636Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.294Z",
            "updatedAt": "2024-02-14T11:30:59.294Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb445c",
            "name": "Civil Engineering",
            "description": "Explore civil engineering concepts",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.969Z",
            "updatedAt": "2024-02-14T11:30:59.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4732f0cb15a0beb4467",
            "name": "Biology",
            "description": "Explore principles of biology",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fa",
                "name": "School of Physical Sciences (SPS)",
                "courses": [
                    "65cca4732f0cb15a0beb445a",
                    "65cca4732f0cb15a0beb445b",
                    "65cca4732f0cb15a0beb445c",
                    "65cca4732f0cb15a0beb445d",
                    "65cca4732f0cb15a0beb445e",
                    "65cca4732f0cb15a0beb445f",
                    "65cca4732f0cb15a0beb4460",
                    "65cca4732f0cb15a0beb4461",
                    "65cca4732f0cb15a0beb4462",
                    "65cca4732f0cb15a0beb4463",
                    "65cca4732f0cb15a0beb4464",
                    "65cca4732f0cb15a0beb4465",
                    "65cca4732f0cb15a0beb4466",
                    "65cca4732f0cb15a0beb4467",
                    "65cca4732f0cb15a0beb4468"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.298Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:30:59.971Z",
            "updatedAt": "2024-02-14T11:30:59.971Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4742f0cb15a0beb4479",
            "name": "General Medicine",
            "description": "Study general medicine and healthcare",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fb",
                "name": "School of Mathematical Sciences (SMS)",
                "courses": [
                    "65cca4742f0cb15a0beb446b",
                    "65cca4742f0cb15a0beb446c",
                    "65cca4742f0cb15a0beb446d",
                    "65cca4742f0cb15a0beb446e",
                    "65cca4742f0cb15a0beb446f",
                    "65cca4742f0cb15a0beb4470",
                    "65cca4742f0cb15a0beb4471",
                    "65cca4742f0cb15a0beb4472",
                    "65cca4742f0cb15a0beb4473",
                    "65cca4742f0cb15a0beb4474",
                    "65cca4742f0cb15a0beb4475",
                    "65cca4742f0cb15a0beb4476",
                    "65cca4742f0cb15a0beb4477",
                    "65cca4742f0cb15a0beb4478",
                    "65cca4742f0cb15a0beb4479"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:00.968Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:00.629Z",
            "updatedAt": "2024-02-14T11:31:00.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4493",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4752f0cb15a0beb4495",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fd",
                "name": "School of Business",
                "courses": [
                    "65cca4752f0cb15a0beb448d",
                    "65cca4752f0cb15a0beb448e",
                    "65cca4752f0cb15a0beb448f",
                    "65cca4752f0cb15a0beb4490",
                    "65cca4752f0cb15a0beb4491",
                    "65cca4752f0cb15a0beb4492",
                    "65cca4752f0cb15a0beb4493",
                    "65cca4752f0cb15a0beb4494",
                    "65cca4752f0cb15a0beb4495",
                    "65cca4752f0cb15a0beb4496",
                    "65cca4752f0cb15a0beb4497",
                    "65cca4752f0cb15a0beb4498",
                    "65cca4752f0cb15a0beb4499",
                    "65cca4752f0cb15a0beb449a",
                    "65cca4752f0cb15a0beb449b"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.241Z",
                "updatedAt": "2024-02-14T11:31:02.296Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:01.962Z",
            "updatedAt": "2024-02-14T11:31:01.962Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4762f0cb15a0beb44a6",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb43fe",
                "name": "School of Entrepreneurship, Procurement & Management",
                "courses": [
                    "65cca4762f0cb15a0beb449e",
                    "65cca4762f0cb15a0beb449f",
                    "65cca4762f0cb15a0beb44a0",
                    "65cca4762f0cb15a0beb44a1",
                    "65cca4762f0cb15a0beb44a2",
                    "65cca4762f0cb15a0beb44a3",
                    "65cca4762f0cb15a0beb44a4",
                    "65cca4762f0cb15a0beb44a5",
                    "65cca4762f0cb15a0beb44a6",
                    "65cca4762f0cb15a0beb44a7",
                    "65cca4762f0cb15a0beb44a8",
                    "65cca4762f0cb15a0beb44a9",
                    "65cca4762f0cb15a0beb44aa",
                    "65cca4762f0cb15a0beb44ab",
                    "65cca4762f0cb15a0beb44ac"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:02.958Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:02.629Z",
            "updatedAt": "2024-02-14T11:31:02.629Z",
            "courseUnits": []
        },
        {
            "_id": "65cca4772f0cb15a0beb44c6",
            "name": "Mathematics",
            "description": "Study mathematics and its applications",
            "school": {
                "_id": "65cca4702f0cb15a0beb4400",
                "name": "School of Biosystems and Environmental Engineering (SOBEE)",
                "courses": [
                    "65cca4772f0cb15a0beb44c0",
                    "65cca4772f0cb15a0beb44c1",
                    "65cca4772f0cb15a0beb44c2",
                    "65cca4772f0cb15a0beb44c3",
                    "65cca4772f0cb15a0beb44c4",
                    "65cca4772f0cb15a0beb44c5",
                    "65cca4772f0cb15a0beb44c6",
                    "65cca4772f0cb15a0beb44c7",
                    "65cca4772f0cb15a0beb44c8",
                    "65cca4772f0cb15a0beb44c9",
                    "65cca4772f0cb15a0beb44ca",
                    "65cca4772f0cb15a0beb44cb",
                    "65cca4772f0cb15a0beb44cc",
                    "65cca4772f0cb15a0beb44cd",
                    "65cca4772f0cb15a0beb44ce"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:04.297Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:03.969Z",
            "updatedAt": "2024-02-14T11:31:03.969Z",
            "courseUnits": []
        },
        {
            "_id": "65cca47a2f0cb15a0beb44fb",
            "name": "Business Administration",
            "description": "Learn about business management",
            "school": {
                "_id": "65cca4702f0cb15a0beb4403",
                "name": "School of Medicine",
                "courses": [
                    "65cca47a2f0cb15a0beb44f3",
                    "65cca47a2f0cb15a0beb44f4",
                    "65cca47a2f0cb15a0beb44f5",
                    "65cca47a2f0cb15a0beb44f6",
                    "65cca47a2f0cb15a0beb44f7",
                    "65cca47a2f0cb15a0beb44f8",
                    "65cca47a2f0cb15a0beb44f9",
                    "65cca47a2f0cb15a0beb44fa",
                    "65cca47a2f0cb15a0beb44fb",
                    "65cca47a2f0cb15a0beb44fc",
                    "65cca47a2f0cb15a0beb44fd",
                    "65cca47a2f0cb15a0beb44fe",
                    "65cca47a2f0cb15a0beb44ff",
                    "65cca47a2f0cb15a0beb4500",
                    "65cca47a2f0cb15a0beb4501"
                ],
                "__v": 0,
                "createdAt": "2024-02-14T11:30:56.242Z",
                "updatedAt": "2024-02-14T11:31:06.418Z"
            },
            "units": [],
            "__v": 0,
            "createdAt": "2024-02-14T11:31:06.087Z",
            "updatedAt": "2024-02-14T11:31:06.087Z",
            "courseUnits": []
        }
    ]

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

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper" style={{ background: '#f0f4f8' }}>
          <section className="content">
            <div className="container-fluid">
              <div className="pt-3 w-100">
                <Card 
                  style={{ 
                    borderRadius: '15px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: '#1a2332'
                  }}
                >
                  <div className="text-center text-white">
                    <Avatar 
                      size={64} 
                      icon={<UserOutlined />} 
                      style={{ 
                        background: '#3498db',
                        border: '2px solid white',
                        marginBottom: '10px'
                      }} 
                    />
                    <Title level={2} style={{ color: 'white', margin: 0 }}>
                      Student Admission Form
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
                    form={form}
                    name="admissionForm"
                    onFinish={onFinish}
                    layout="vertical"
                    labelCol={{ span: 32 }}
                    wrapperCol={{ span: 32 }}
                  >
                    {/* Submit Status Messages */}
                    {submitStatus === 'success' && (
                      <Alert
                        message="Success!"
                        description="Student has been successfully registered. Redirecting to student list..."
                        type="success"
                        showIcon
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      />
                    )}
                    {submitStatus === 'error' && (
                      <Alert
                        message="Error"
                        description="There was an error submitting the form. Please try again."
                        type="error"
                        showIcon
                        style={{ marginBottom: '20px', borderRadius: '10px' }}
                      />
                    )}

                    {isSubmitting && (
                      <div style={{ 
                        textAlign: 'center', 
                        padding: '20px',
                        background: '#f0f4f8',
                        borderRadius: '10px',
                        marginBottom: '20px'
                      }}>
                        <Spin indicator={antIcon} />
                        <p style={{ marginTop: '10px', color: '#1a2332', fontWeight: '500' }}>
                          Submitting student application... Please wait
                        </p>
                      </div>
                    )}

                    <div style={{ display: currentStep === 0 && !isSubmitting ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <UserOutlined style={{ color: '#3498db' }} />
                            <span>Personal Information</span>
                            <Badge count="Required" style={{ backgroundColor: '#3498db' }} />
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
                                          border: '2px solid #3498db'
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

                    <div style={{ display: currentStep === 1 && !isSubmitting ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <BookOutlined style={{ color: '#3498db' }} />
                            <span>Academic Information</span>
                            <Badge count="Required" style={{ backgroundColor: '#3498db' }} />
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
                                  .filter(course => course.school && course.school._id === schoolselected)
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

                    <div style={{ display: currentStep === 2 && !isSubmitting ? 'block' : 'none' }}>
                      <Card 
                        title={
                          <Space>
                            <TeamOutlined style={{ color: '#3498db' }} />
                            <span>Parent/Guardian Details</span>
                            <Badge count="Required" style={{ backgroundColor: '#3498db' }} />
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
                          style={{ display: currentStep > 0 && !isSubmitting ? 'block' : 'none' }}
                          disabled={isSubmitting}
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
                            disabled={isSubmitting}
                          >
                            Next →
                          </Button>
                        ) : (
                          <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                            <Button 
                              type="submit"
                              htmlType="submit"
                              className="w-100"
                              disabled={isSubmitting}
                              style={{ 
                                background: '#3498db',
                                border: 'none',
                                color: 'white',
                                padding: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                borderRadius: '10px',
                                transition: 'all 0.3s ease',
                                opacity: isSubmitting ? 0.7 : 1
                              }}
                              onMouseEnter={(e) => {
                                if (!isSubmitting) {
                                  e.target.style.background = '#2980b9';
                                  e.target.style.transform = 'translateY(-2px)';
                                  e.target.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.4)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSubmitting) {
                                  e.target.style.background = '#3498db';
                                  e.target.style.transform = 'translateY(0)';
                                  e.target.style.boxShadow = 'none';
                                }
                              }}
                            >
                              {isSubmitting ? (
                                <span>
                                  <Spin size="small" indicator={antIcon} style={{ marginRight: '10px' }} />
                                  Submitting...
                                </span>
                              ) : (
                                <span><SaveOutlined /> Submit Application</span>
                              )}
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