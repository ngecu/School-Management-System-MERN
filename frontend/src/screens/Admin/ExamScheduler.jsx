import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, message, Row, Col } from 'antd';
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
import { createExam } from '../../actions/examActions';

const { Option } = Select;

const ExanSchedulerScreen = () => {
  const [studentId, setStudentId] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getAllFees = useSelector((state) => state.getAllFees);
  const { loading, error, fees } = getAllFees;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const onFinish = (values) => {
    dispatch(createExam(values))
      .then(() => {
        message.success('Exam scheduled successfully!');
      })
      .catch((error) => {
        message.error(error.message || 'Failed to schedule exam.');
      });
  };


  useEffect(() => {
    dispatch(listCourses());
  }, [dispatch]);

  const schoolsList = useSelector((state) => state.schoolList);
  const { loading: loadingSchools, schools, error: errorSchools } = schoolsList;

  const coursesList = useSelector((state) => state.courseList);
  const { loading: loadingCourses, courses, error: errorCourses } = coursesList;

  return (
    <div class="hold-transition sidebar-mini layout-fixed">
      <div class="wrapper">
        <Topbar />
        <Sidebar />
        <div class="content-wrapper">
          <section class="content">
            <div class="container-fluid">
              <Form
                name="examForm"
                onFinish={onFinish}
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

                  <Col span={6}>
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

                  <Col span={6}>
                    {/* Added Start Time field */}
                    <Form.Item
                      label="Start Time"
                      name="startTime"
                      rules={[{ required: true, message: 'Please enter the start time!' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
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
                      label="Course Unit"
                      name="courseUnit"
                      rules={[{ required: true, message: 'Please select the course unit!' }]}
                    >
                      <Select>
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

                <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                  <Button type="primary" htmlType="submit">
                    Schedule Exam
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

export default ExanSchedulerScreen;
