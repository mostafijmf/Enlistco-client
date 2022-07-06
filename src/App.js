import './App.css';
import Header from './Pages/Shared/Header';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import UserProfile from './Pages/UserData/UserProfile';
import HelpCenter from './Pages/Shared/HelpCenter';
import NotFound from './Pages/Shared/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserApplication from './Pages/UserData/UserApplication';
import UserContact from './Pages/UserData/UserContact';
import UserJobExperience from './Pages/UserData/UserJobExperience';
import UserEducation from './Pages/UserData/UserEducation';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }>
            <Route path='/dashboard/userProfile' element={
              <RequireAuth>
                <UserProfile></UserProfile>
              </RequireAuth>
            }></Route>
            <Route path='/dashboard/userApplication' element={
              <RequireAuth>
                <UserApplication></UserApplication>
              </RequireAuth>
            }></Route>
          </Route>
          <Route path='/form/userContact' element={
            <RequireAuth>
              <UserContact></UserContact>
            </RequireAuth>
          }></Route>
          <Route path='/form/jobExperience' element={
            <RequireAuth>
              <UserJobExperience></UserJobExperience>
            </RequireAuth>
          }></Route>
          <Route path='/form/education' element={
            <RequireAuth>
              <UserEducation></UserEducation>
            </RequireAuth>
          }></Route>
          <Route path='/helpCenter' element={<HelpCenter></HelpCenter>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signUp' element={<SignUp></SignUp>}></Route>
          <Route path='/*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;