import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select,  message, Row, Col } from 'antd';
import moment from 'moment'; // Import moment library
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Sidebar from './components/Sidebar';
import { AllFees, getFeesByStudent } from '../../actions/feeActions';
import Topbar from './components/Topbar';
import { listCourses } from '../../actions/courseActions';
import { createExam, getAllExams } from '../../actions/examActions';
import { Table,Button } from 'react-bootstrap';
import { getCourseUnitsByCourseA } from '../../actions/courseUnitActions';


const { Option } = Select;

const ExanSchedulerScreen = () => {
  const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllFees = useSelector((state) => state.getAllFees);
  const { loading, error, fees } = getAllFees;

  const getCourseUnitsByCourse = useSelector((state) => state.getCourseUnitsByCourse);
  const {success, courseUnits } = getCourseUnitsByCourse;
  const [message, setMessage] = useState(null);

  
  const location = useLocation();

  const onFinish = (values) => {
    console.log(values);
    dispatch(createExam(values))
      .then(() => {
        message.success('Exam scheduled successfully!');
      })
      .catch((error) => {
        message.error(error.message || 'Failed to schedule exam.');
      });
  };


  const handleCourseChange = (selectedCourseId) => {
  dispatch(getCourseUnitsByCourseA(selectedCourseId))
  };



  useEffect(() => {
    dispatch(listCourses());
    dispatch(getAllExams())
  }, [dispatch,success]);

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

  const examList = useSelector((state) => state.examList);
  const { loading: loadingExams, exams, error: errorExams } = examList;

  
  // const coursesUnitList = useSelector((state) => state.coursesUnitList);
  // const { loading: loadingCourses, courses, error: errorCourses } = coursesUnitList;



  return (
    <div class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
        <Topbar />
        <Sidebar />
        {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
            <h1>Schedule Exam</h1>

              <Form
                name="examForm"
                onFinish={onFinish}
                layout="vertical"
                labelCol={{ span: 32 }}
                wrapperCol={{ span: 32 }}
                initialValues={{ examType: 'Main' }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[{ required: true, message: 'Please enter the title!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Date"
                      name="date"
                      rules={[
                        { required: true, message: 'Please select the date!' },
                        {
                          validator(_, value) {
                            // Custom validation to ensure the date is not in the past
                            if (moment(value).isBefore(moment(), 'day')) {
                              return Promise.reject('Date cannot be in the past!');
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>

                        <Col span={12}>
                      {/* Updated to use Select for Start Time */}
                      <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[{ required: true, message: 'Please select the start time!' }]}
                      >
                        <Select>
                          {/* Generating options for Start Time from 00 to 24 */}
                          {[...Array(24).keys()].map((hour) => (
                            <Select.Option key={hour} value={hour.toString().padStart(2, '0') + ':00'}>
                              {hour.toString().padStart(2, '0') + ':00'}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
               
                  <Col span={12}>
                    <Form.Item
                      label="Exam Type"
                      name="examType"
                      rules={[{ required: true, message: 'Please select the exam type!' }]}
                    >
                      <Select>
                        <Option value="Main">Main</Option>
                        <Option value="Cat">Cat</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Course"
                      name="course"
                      rules={[{ required: true, message: 'Please select the course unit!' }]}
                    >
                      <Select  onChange={handleCourseChange}>
                        {courses &&
                          courses.map((course) => (
                            <Option key={course._id} value={course._id}>
                              {course.name}
                            </Option>
                          ))}
                      </Select>
                    </Form.Item>
                  </Col>
               


      <Col md={12}>
                      <Form.Item
  label="Mode Of Study"
  name="mos"
  rules={[
    {
      required: true,
      message: 'Please select the course!',
    },
  ]}
>
  <Select >
    <Select.Option key="full_time" value="full_time">
     Full Time
    </Select.Option>
    <Select.Option key="full_time" value="full_time">
     Part Time
    </Select.Option>
  </Select>
</Form.Item>
                      </Col>
                 

                </Row>

                <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                  <Button type="primary" className='w-100' htmlType="submit">
                    Schedule Exam
                  </Button>
                </Form.Item>
              </Form>
              
              <h1>Scheduled Exams</h1>

              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>TITLE</th>
                    <th>DATE</th>
                    <th>START TIME</th>
                    <th>EXAM TYPE</th>
                    <th></th>
                   

                  </tr>
                </thead>
                <tbody>
                {exams && exams.map((exam) => {
  // Parse exam date and time
  const examDateTime = new Date(exam.date);

  // Extract hours and minutes from the start time
  const startTimeParts = exam.startTime.split(':');
  examDateTime.setHours(startTimeParts[0], startTimeParts[1], 0);

  // Calculate current date and time
  const currentDateTime = new Date();

  // Check if the exam date and time have passed
  const isExpired = currentDateTime > examDateTime;

  return (
    <tr key={exam._id}>
      <td>{exam.title}</td>
      <td>{new Date(exam.date).toLocaleDateString()}</td>
      <td>{exam.startTime}</td>
      <td>{exam.examType}</td>
      <td>
        {isExpired ? (
          <span className="badge badge-danger">Expired</span>
        ) : (
          <span className="badge badge-success">Active</span>
        )}
      </td>
    </tr>
  );
})}


                </tbody>
              </Table>
            </div>
          </section>
        </div>
          )}
      </div>
    </div>
  );
};

export default ExanSchedulerScreen;
