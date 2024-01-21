import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';


import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import LostPasswordScreen from './screens/LostPasswordScreen'
import NewPasswordScreen from './screens/NewPasswordScreen'
import ChatScreen from './screens/ChatScreen'
import AllStudents from './screens/Admin/AllStudentsScreen';
import AdmissionScreen from './screens/Admin/AdmissionScreen';
import AddLecturerScreen from './screens/Admin/AddLecturerScreen';
import AllLecturers from './screens/Admin/AllTeachersScreen';
import AllParentsScreen from './screens/Admin/AllParentsScreen';
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

const App = () => {

  return (
    <HelmetProvider>
    <Router>
      
      <main>

          <Route path='/' component={LoginScreen} exact />
          <Route path="/lost-password" component={LostPasswordScreen} />
          <Route path="/new-password/:id/:token" component={NewPasswordScreen} />
          
          <Route path="/allStudents" component={AllStudents} />
          <Route path="/admission" component={AdmissionScreen} />
          <Route path="/add_lecturer" component={AddLecturerScreen} />
          <Route path="/allLecturers" component={AllLecturers} />
          <Route path="/allParents" component={AllParentsScreen} />
          <Route path="/allAttedance" component={AttedanceScreen} />
          <Route path="/add_accountant" component={AddAccountant} />
          
          <Route path="/chat" component={ChatScreen} />
          <Route path="/student/chat" component={ChatScreen} />


          {/* students routes  */}
          <Route path="/my_attendance" component={studentAttendanceScreen} />
          <Route path="/my_exam" component={studentExamResultScreen} />
          <Route path="/my_timetable" component={studentTimeTableScreen} />
          <Route path="/my_fees" component={studentFeeScreen} />
          <Route path="/my_profile" component={StudentProfileScreen} />
          <Route path="/student/invoice" component={studentInvoiceScreen} />

          {/* account routes  */}
          <Route path="/accountant/fee" component={AccountantFeeScreen} />
          <Route path="/accountant/payments" component={AccountantPaymentScreen} />
          
       
      </main>
      
    </Router>
    </HelmetProvider>
  )
}

export default App
