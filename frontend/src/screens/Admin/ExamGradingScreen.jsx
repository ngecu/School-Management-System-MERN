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

import Topbar from './components/Topbar';
import { listCourses } from '../../actions/courseActions';
import { createExam, getAllExams } from '../../actions/examActions';
import { Table,Button } from 'react-bootstrap';
import { getCourseUnitsByCourseA } from '../../actions/courseUnitActions';


const { Option } = Select;

const ExamGradingScreen = () => {
  const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllFees = useSelector((state) => state.getAllFees);
  const { loading, error, fees } = getAllFees;

  const getCourseUnitsByCourse = useSelector((state) => state.getCourseUnitsByCourse);
  const {success, courseUnits } = getCourseUnitsByCourse;

  const [message, setMessage] = useState(null);

  
  const [search, setSearch] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

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
  const { loading: loadingSchools, schools, error: errorSchools } = schoolsList;

  const coursesList = useSelector((state) => state.courseList);
  const { loading: loadingCourses, courses, error: errorCourses } = coursesList;


  const examList = useSelector((state) => state.examList);
  const { loading: loadingExams, exams, error: errorExams } = examList;

  
  // const coursesUnitList = useSelector((state) => state.coursesUnitList);
  // const { loading: loadingCourses, courses, error: errorCourses } = coursesUnitList;



  return (
    <div class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
        <Topbar />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
            <h1>Grade Student</h1>

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
                  {courseUnits &&  <Col span={12}>
        <Form.Item
          label={`Course Units ${courseUnits.length}`}
          name="courseUnit"
          rules={[{ required: true, message: 'Please select the course unit!' }]}
        >
          <Select>
            {courseUnits && courseUnits.length > 0 && courseUnits.map((courseUnit) => (
              <Option key={courseUnit._id} value={courseUnit._id}>
               {courseUnit.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col> }

      <Col span={12}>
                    <Form.Item
                      label="Student"
                      name="student"
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
                 

                  <Col span={12}>
                    <Form.Item
                      label="Grade"
                      name="grade"
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
                     
              
            

                </Row>

                <Form.Item wrapperCol={{ offset: 0, span: 32 }}>
                  <Button type="primary" className='w-100' htmlType="submit">
                    GRADE
                  </Button>
                </Form.Item>
              </Form>
              
              <h1>LATEST GRADINGS</h1>

              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>STUDENT</th>
                    <th>COURSE</th>
                    <th>COURSE UNIT</th>
                    <th>GRADE</th>
                  
                   

                  </tr>
                </thead>
                <tbody>
                
                </tbody>
              </Table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExamGradingScreen;
