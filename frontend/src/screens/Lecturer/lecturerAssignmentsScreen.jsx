import React, {useCallback, useState, useEffect } from 'react';
import { Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import { getSchoolDetails } from '../../actions/schoolActions';
import Topbar from './components/Topbar';
import { listStudents } from '../../actions/studentActions';
import { Table,Form, Input, DatePicker,  Select ,Collapse} from 'antd';
import { createAssignment, listAssignments } from '../../actions/assignmentActions';
const { Option } = Select;
const { Panel } = Collapse;
const LecturerAssignmentsScreen = () => {
  

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const schoolDetails = useSelector((state) => state.schoolDetails);
  const { school } = schoolDetails;

  const assignmentList = useSelector((state) => state.assignmentList);
  const {loading,assignments} = assignmentList
  
  useEffect(() => {
    dispatch(getSchoolDetails(userInfo.userData.school))
    dispatch(listAssignments())
  }, [dispatch]);


  
    const onFinish = (values) => {
      console.log(values);
      dispatch(createAssignment(values));
      // form.resetFields();
    };


    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate',
      },
    ];

    
  return (
    <div class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

<Topbar/>
        <Sidebar />
        <div class="content-wrapper">

        <section class="content">
      <div class="container-fluid">

        <div class="row pt-3">
     
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card h-100">
                <div class="card-body">
                 Given Assigments : {school && school.name}
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                  Submissions:  {userInfo && userInfo.userData.courses.length}
                    </div>
                    </div>
            </div>

              <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                 Approved Submissions: 
                    </div>
                    </div>
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
            <div class="card h-100">
                <div class="card-body">
                 Average Assignment Credits:
                    </div>
                    </div>
            </div>

               <div class="col-xl-12 col-md-12 mb-4">
              <div class="card h-100">
                <div class="card-body">
                <div className="d-flex justify-content-between align-items-center">
            <h5>ASSIGNMENT PAGE</h5>
          
          
          </div>

          <Collapse accordion>
            <Panel header="Create Assignment" key="1">
          <Form
      
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ yearOfStudy: 1 }} // Set default yearOfStudy to 1
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the assignment title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please enter the assignment description' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Due Date"
        name="dueDate"
        rules={[{ required: true, message: 'Please select the due date' }]}
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>

      <Form.Item
        label="Course"
        name="course"
        rules={[{ required: true, message: 'Please select the course' }]}
      >
<Select>
  {school &&
    school.courses.map((course) => (
      <Option key={course._id} value={course._id}>
        {course.name}
      </Option>
    ))}
</Select>

      </Form.Item>

      <Form.Item
        label="Year of Study"
        name="yearOfStudy"
        rules={[{ required: true, message: 'Please select the year of study' }]}
      >
        <Select>
          <Option value={1}>Year 1</Option>
          <Option value={2}>Year 2</Option>
          <Option value={3}>Year 3</Option>
          <Option value={4}>Year 4</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" className="w-100" htmlType="submit">
          Create Assignment
        </Button>
      </Form.Item>
    </Form>
    </Panel>

    <Panel header="Assignment List" key="2">
  <Table dataSource={assignments} columns={columns} />
</Panel>
          </Collapse>
                </div>
              </div>
            </div>
       
        </div>

        
        </div>

        </section>
        </div>
       


</div>

    </div>
  );
};

export default LecturerAssignmentsScreen;
