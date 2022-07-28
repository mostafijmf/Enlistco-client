import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import UserProfile from './Pages/UserData/UserProfile';
import HelpCenter from './Pages/Shared/HelpCenter';
import NotFound from './Pages/Shared/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserContact from './Pages/UserData/UserContact';
import UserJobExperience from './Pages/UserData/UserJobExperience';
import UserEducation from './Pages/UserData/UserEducation';
import EmployerContact from './Pages/Employer/EmployerContact';
import JobDescription from './Pages/Employer/JobDescription';
import ApplicationOptions from './Pages/Employer/ApplicationOptions';
import MyApplication from './Pages/Dashboard/MyApplication';
import Applied from './Pages/UserData/Applied';
import JobPost from './Pages/Employer/JobPost';
import NewEntry from './Pages/Login/NewEntry';
import ManageUsers from './Pages/Admin/ManageUsers';
import ManageJobPost from './Pages/Admin/ManageJobPost';
import RequireAdmin from './Pages/Login/RequireAdmin';
import SeekerApplications from "./Pages/Employer/SeekerApplications";
import Resume from "./Pages/Employer/Resume";
import AdminPost from "./Pages/Admin/AdminPost";
import CandidatesProfile from "./Pages/Employer/CandidatesProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>

        <Route path='/new-entry' element={
          <RequireAuth>
            <NewEntry></NewEntry>
          </RequireAuth>
        }></Route>

        {/* ---------------Dashboard--------------- */}
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>}>
          <Route path='/dashboard/manage-users' element={
            <RequireAdmin>
              <ManageUsers></ManageUsers>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-job-post' element={
            <RequireAdmin>
              <ManageJobPost></ManageJobPost>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/admin-job-post' element={
            <RequireAdmin>
              <AdminPost></AdminPost>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/userProfile' element={
            <RequireAuth>
              <UserProfile></UserProfile>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/myApplication' element={
            <RequireAuth>
              <MyApplication></MyApplication>
            </RequireAuth>}>
            <Route path='/dashboard/myApplication/applied' element={
              <RequireAuth>
                <Applied></Applied>
              </RequireAuth>
            }></Route>
            <Route path='/dashboard/myApplication/post' element={
              <RequireAuth>
                <JobPost></JobPost>
              </RequireAuth>
            }></Route>
          </Route>
          <Route path='/dashboard/seeker-applications' element={
            <RequireAuth>
              <SeekerApplications></SeekerApplications>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/seeker-profile' element={
            <RequireAuth>
              <CandidatesProfile></CandidatesProfile>
            </RequireAuth>
          }></Route>
        </Route>
        <Route path='/dashboard/seeker-resume' element={
          <RequireAuth>
            <Resume></Resume>
          </RequireAuth>
        }></Route>
        {/* ---------------user form--------------- */}
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

        {/* ---------------employer job form--------------- */}
        <Route path='/employer/contact' element={
          <RequireAuth>
            <EmployerContact></EmployerContact>
          </RequireAuth>
        }></Route>
        <Route path='/employer/jobDesciption' element={
          <RequireAuth>
            <JobDescription></JobDescription>
          </RequireAuth>
        }></Route>
        <Route path='/employer/ApplicationOptions' element={
          <RequireAuth>
            <ApplicationOptions></ApplicationOptions>
          </RequireAuth>
        }></Route>


        <Route path='/helpCenter' element={<HelpCenter></HelpCenter>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signUp' element={<SignUp></SignUp>}></Route>
        <Route path='/*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;