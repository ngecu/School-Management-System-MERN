import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';


import Header from './components/Header'
import Footer from './components/Footer'
import LoginScreen from './screens/LoginScreen'
import LostPasswordScreen from './screens/LostPasswordScreen'
import NewPasswordScreen from './screens/NewPasswordScreen'
import ChatScreen from './screens/ChatScreen'
import AllStudents from './screens/Admin/AllStudentsScreen';

const App = () => {

  return (
    <HelmetProvider>
    <Router>
      
      <main>

          <Route path='/' component={LoginScreen} exact />
          <Route path="/lost-password" component={LostPasswordScreen} />
          <Route path="/new-password/:id/:token" component={NewPasswordScreen} />
          
          <Route path="/allStudents" component={AllStudents} />
          
          <Route path="/chat" component={ChatScreen} />

       
      </main>
      
    </Router>
    </HelmetProvider>
  )
}

export default App
