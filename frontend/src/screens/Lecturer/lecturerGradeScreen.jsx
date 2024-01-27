// Assuming this is the LecturerGradeScreen.js file

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, DatePicker, Select, Collapse, Table } from 'antd';
import { createExam, getAllExams } from '../../actions/examActions';
import { createExamResult, getAllExamResults } from '../../actions/examResultActions';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { listStudents } from '../../actions/studentActions';

const { Option } = Select;
const { Panel } = Collapse;

const LecturerGradeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const examList = useSelector((state) => state.examList);
  const { loading: examsLoading, exams } = examList;

  const examResultsList = useSelector((state) => state.examResultsList);
  const { loading: examResultsLoading, examResults } = examResultsList;

  const examResultCreate = useSelector((state) => state.examResultCreate);
  const { success } = examResultCreate;

  const studentList = useSelector((state) => state.studentList);
  const { loading, error, students } = studentList;

  useEffect(() => {
    dispatch(getAllExams());
    dispatch(getAllExamResults());
    dispatch(listStudents());

  }, [dispatch, location,success]);

  const onFinishExam = (values) => {
    dispatch(createExam(values));
  };

  const onFinishExamResult = (values) => {
    dispatch(createExamResult(values));
  };

  const examColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Exam Type',
      dataIndex: 'examType',
      key: 'examType',
    },
    // Add more columns as needed
  ];

  const examResultColumns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'Marks Obtained',
      dataIndex: 'marksObtained',
      key: 'marksObtained',
    },
    // Add more columns as needed
  ];

  return (
    <div className="hold-transition sidebar-mini layout-fixed">
      <div className="wrapper">
        <Topbar />
        <Sidebar />
        <div className="content-wrapper">
          <section className="content">
            <div className="container-fluid">
            

              {/* Exam List Table */}
              <Collapse accordion>
                <Panel header="Exam List" key="2">
                  <Table dataSource={exams} columns={examColumns} />
                </Panel>
              </Collapse>

              {/* Create Exam Result Form */}
              <Collapse accordion>
                <Panel header="Create Exam Result" key="3">
                  <Form onFinish={onFinishExamResult}>
                  <Form.Item
        label="Student"
        name="student"
        rules={[{ required: true, message: 'Please select the student' }]}
      >
       <Select>
                        {students && students.map((student) => (
                          <Option key={student._id} value={student._id}>
                            {student.firstName} {/* Modify this based on your student data structure */}
                          </Option>
                        ))}
                      </Select>
      </Form.Item>

      <Form.Item
        label="Exam"
        name="exam"
        rules={[{ required: true, message: 'Please select the exam' }]}
      >
         <Select>
                        {exams && exams.map((exam) => (
                          <Option key={exam._id} value={exam._id}>
                            {exam.title} {/* Modify this based on your exam data structure */}
                          </Option>
                        ))}
                      </Select>
      </Form.Item>

      <Form.Item
        label="Marks Obtained"
        name="marksObtained"
        rules={[{ required: true, message: 'Please enter the marks obtained' }]}
      >
        <Input type="number" />
      </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Create Exam Result
                    </Button>
                  </Form>
                </Panel>
              </Collapse>

              {/* Exam Result List Table */}
              <Collapse accordion>
                <Panel header="Exam Result List" key="4">
                  <Table dataSource={examResults} columns={examResultColumns} />
                </Panel>
              </Collapse>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LecturerGradeScreen;
