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
