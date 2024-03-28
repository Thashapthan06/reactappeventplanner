// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Navbar01 from './Components/Navbar01';
import Navbar02 from './Components/Navbar02';
import UserSignUp from './Pages/UserSignUp';
import ServiceproviderSignUp from './Pages/ServiceproviderSignUp';
import Login from './Pages/Login';
import ResetPassword from './Pages/ResetPassword';
import EventPlanningTool from './Pages/EventPlanningTool';
import ResultsWithBudgetCalculator from './Pages/ResultsWithBudgetCalculator';
import ServiceProviderProfileForUser from './Pages/ServiceProviderProfileForUser';
import ServiceProviderProfileForServiceProvider from './Pages/ServiceProviderProfileForServiceProvider';
import UserProfile from './Pages/UserProfile'
import Analytics from './Pages/Analytics';
import UserChatBot from './Pages/UserChatBot';

function Navigation({ userRole }) {
  console.log('Received user role in Navigation:', userRole);
  const location = useLocation(); // Get the current route location

  // Check if the current route path matches any of the specified paths
  const isNavbar01Visible = [
    '/usersignup',
    '/serviceprovidersignup',
    '/login',
    '/resetpassword',
  ].includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar01 or Navbar02 based on the current route */}
      {isNavbar01Visible || location.pathname === '/' ? <Navbar01 /> : <Navbar02 role={userRole} />}
    </>
  );
}

function App() {
  const [userRole, setUserRole] = useState(null); // Initialize user role state

  useEffect(() => {
    console.log('Updated user role:', userRole); // Log updated user role whenever it changes
  }, [userRole]);

  return (
    <Router>
      <div>
        <Navigation userRole={userRole} /> {/* Pass the userRole state to Navigation */}
        <Routes>
          <Route path="/usersignup" element={<UserSignUp />} />
          <Route path="/serviceprovidersignup" element={<ServiceproviderSignUp />} />
          {/* Pass setUserRole function to the Login component */}
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/eventplanningtool" element={<EventPlanningTool />} />
          <Route path="/resultswithbudgetcalculator" element={<ResultsWithBudgetCalculator />} />
          <Route path="/serviceproviderprofileforuser" element={<ServiceProviderProfileForUser />} />
          <Route path="/serviceProviderprofileForserviceProvider" element={<ServiceProviderProfileForServiceProvider />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/userchatbot" element={<UserChatBot />} />
          
          {/* Add more routes as needed */}
        </Routes>
        {/* Remove the conditional rendering of Navbar02 */}
        {userRole && <Navbar02 role ={userRole} />}
      </div>
    </Router>
  );
}

export default App;
