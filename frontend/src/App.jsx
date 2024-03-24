import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';


import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import LostPasswordScreen from './screens/LostPasswordScreen'
import NewPasswordScreen from './screens/NewPasswordScreen'

import AllStudents from './screens/Admin/AllStudentsScreen';
import AdmissionScreen from './screens/Admin/AdmissionScreen';
import AddLecturerScreen from './screens/Admin/AddLecturerScreen';
import AllLecturers from './screens/Admin/AllTeachersScreen';

import AttedanceScreen from './screens/Admin/AttendanceScreen';
import studentAttendanceScreen from './screens/Student/studentAttendanceScreen';
import studentExamResultScreen from './screens/Student/studentExamResultScreen';
import studentTimeTableScreen from './screens/Student/studentTimetableScreen';
import studentFeeScreen from './screens/Student/studentFeeScreen';
import StudentProfileScreen from './screens/Student/studentProfileScreen';
import AccountantFeeScreen from './screens/Accountant/AccountantFeeScreen';
import AccountantPaymentScreen from './screens/Accountant/AccountantPaymentScreen';
import studentInvoiceScreen from './screens/Student/studentInvoice';
import AddAccountant from './screens/Admin/AddAccountantScreen';
import AdminFeeScreen from './screens/Admin/AllFeeScreen';
import ExanSchedulerScreen from './screens/Admin/ExamScheduler';
import ExamGradingScreen from './screens/Admin/ExamGradingScreen';
import LecturerProfileScreen from './screens/Lecturer/lecturerProfileScreen';
import LecturerMyStudentsScreen from './screens/Lecturer/lecturerMyStudentsScreen';
import LecturerAssignmentsScreen from './screens/Lecturer/lecturerAssignmentsScreen';
import LecturerGradeScreen from './screens/Lecturer/lecturerGradeScreen';
import AllAccountants from './screens/Admin/AllAccountants';

const App = () => {

  return (
    <HelmetProvider>
    <Router>
      
      <main>
          {/* GENERAL ROUTES  */}
          <Route path='/' component={LoginScreen} exact />
          <Route path="/lost-password" component={LostPasswordScreen} />
          <Route path="/new-password/:id/:token" component={NewPasswordScreen} />
          
          {/* ADMIN ROUTES  */}
          <Route path="/admin/allStudents" component={AllStudents} />
          <Route path="/admin/admission" component={AdmissionScreen} />
          <Route path="/admin/add_lecturer" component={AddLecturerScreen} />
          <Route path="/admin/allLecturers" component={AllLecturers} />
          <Route path="/admin/AllAccountants" component={AllAccountants} />
         
          <Route path="/admin/allAttedance" component={AttedanceScreen} />

          

          <Route path="/admin/add_accountant" component={AddAccountant} />
          <Route path="/admin/allfee" component={AdminFeeScreen} />
          <Route path="/admin/exam_schedule" component={ExanSchedulerScreen} />
          <Route path="/admin/exam_grade" component={ExamGradingScreen} />


          {/* students routes  */}
          <Route path="/student/my_attendance" component={studentAttendanceScreen} />
          <Route path="/student/my_exam" component={studentExamResultScreen} />
          <Route path="/student/my_fees" component={studentFeeScreen} />
          <Route path="/student/my_profile" component={StudentProfileScreen} />
          <Route path="/student/invoice" component={studentInvoiceScreen} />

          {/* account routes  */}
          <Route path="/accountant/fee" component={AccountantFeeScreen} />
          <Route path="/accountant/payments" component={AccountantPaymentScreen} />
          
       {/* lecrurer routes  */}
       <Route path="/lecturer/profile" component={LecturerProfileScreen} />
       <Route path="/lecturer/my_students" component={LecturerMyStudentsScreen} />
       <Route path="/lecturer/assignments" component={LecturerAssignmentsScreen} />
       <Route path="/lecturer/grades" component={LecturerGradeScreen} />
       <Route path="/lecturer/profile" component={LecturerProfileScreen} />

      </main>
      
    </Router>
    </HelmetProvider>
  )
}

export default App
