import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import SignUp from './Pages/Login/SignUp';
import RequireAuth from './Pages/Login/RequireAuth';
import UserProfile from './Pages/UserData/SeekerProfile/UserProfile';
import HelpCenter from './Pages/Shared/HelpCenter';
import NotFound from './Pages/Shared/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserContact from './Pages/UserData/Form/UserContact';
import UserJobExperience from './Pages/UserData/Form/UserJobExperience';
import UserEducation from './Pages/UserData/Form/UserEducation';
import EmployerContact from "./Pages/Employer/Form/EmployerContact";
import JobDescription from './Pages/Employer/Form/JobDescription';
import ApplicationOptions from './Pages/Employer/Form/ApplicationOptions';
import MyApplication from './Pages/Dashboard/MyApplication';
import Applied from './Pages/UserData/SeekerProfile/Applied';
import JobPost from './Pages/Employer/JobPost';
import NewEntry from './Pages/Login/NewEntry';
import ManageJobPost from './Pages/Admin/Manage Job-post/ManageJobPost';
import RequireAdmin from './Pages/Login/RequireAdmin';
import SeekerApplications from "./Pages/Employer/Candidates/SeekerApplications";
import Resume from "./Pages/Employer/Candidates/Resume";
import AdminPost from "./Pages/Admin/AdminPost";
import CandidatesProfile from "./Pages/Employer/Candidates/CandidatesProfile";
import SendOfferLetter from "./Pages/Employer/Candidates/SendOfferLetter";
import JobDetails from "./Pages/Home/JobDetails";
import ManageRecruiters from "./Pages/Admin/Manage Recruiters/ManageRecruiters";
import ManageJobSeekers from "./Pages/Admin/Manage Seekers/ManageJobSeekers";
import RecruiterDetails from "./Pages/Admin/Manage Recruiters/RecruiterDetails";
import SeekerDetails from "./Pages/Admin/Manage Seekers/SeekerDetails";
import ViewApplicants from "./Pages/Admin/Manage Job-post/ViewApplicants";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}>
          <Route path='/job/:id' element={<JobDetails></JobDetails>}></Route>
        </Route>

        <Route path='/new-entry' element={
          <RequireAuth>
            <NewEntry></NewEntry>
          </RequireAuth>
        }></Route>

        {/* ====================
            Dashboard
        ==================== */}
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard></Dashboard>
          </RequireAuth>}>

          {/* ====================
              Admin Dashboard
          ==================== */}
          <Route path='/dashboard/manage-recruiters' element={
            <RequireAdmin>
              <ManageRecruiters></ManageRecruiters>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-recruiters/details' element={
            <RequireAdmin>
              <RecruiterDetails></RecruiterDetails>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-seekers' element={
            <RequireAdmin>
              <ManageJobSeekers></ManageJobSeekers>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-seekers/details' element={
            <RequireAdmin>
              <SeekerDetails></SeekerDetails>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-job-post' element={
            <RequireAdmin>
              <ManageJobPost></ManageJobPost>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-job-post/view-applicants' element={
            <RequireAdmin>
              <ViewApplicants></ViewApplicants>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/admin-job-post' element={
            <RequireAdmin>
              <AdminPost></AdminPost>
            </RequireAdmin>
          }></Route>

          {/* ====================
              User Dashboard
          ==================== */}
          <Route path='/dashboard/user-profile' element={
            <RequireAuth>
              <UserProfile></UserProfile>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/application' element={
            <RequireAuth>
              <MyApplication></MyApplication>
            </RequireAuth>}>
            <Route path='/dashboard/application/applied' element={
              <RequireAuth>
                <Applied></Applied>
              </RequireAuth>
            }></Route>
            <Route path='/dashboard/application/post' element={
              <RequireAuth>
                <JobPost></JobPost>
              </RequireAuth>
            }></Route>
          </Route>
          <Route path='/dashboard/seeker-applications' element={
            <RequireAuth>
              <SeekerApplications></SeekerApplications>
            </RequireAuth>
          }>
          </Route>
          <Route path='/dashboard/seeker-applications/offer-letter' element={
            <RequireAuth>
              <SendOfferLetter></SendOfferLetter>
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
        
        {/* ====================
              User Form
          ==================== */}
        <Route path='/form/user-contact' element={
          <RequireAuth>
            <UserContact></UserContact>
          </RequireAuth>
        }></Route>
        <Route path='/form/job-experience' element={
          <RequireAuth>
            <UserJobExperience></UserJobExperience>
          </RequireAuth>
        }></Route>
        <Route path='/form/education' element={
          <RequireAuth>
            <UserEducation></UserEducation>
          </RequireAuth>
        }></Route>

        {/* ====================
              Employer job form
          ==================== */}
        <Route path='/employer-form/contact' element={
          <RequireAuth>
            <EmployerContact></EmployerContact>
          </RequireAuth>
        }></Route>
        <Route path='/employer-form/job-description' element={
          <RequireAuth>
            <JobDescription></JobDescription>
          </RequireAuth>
        }></Route>
        <Route path='/employer-form/application-options' element={
          <RequireAuth>
            <ApplicationOptions></ApplicationOptions>
          </RequireAuth>
        }></Route>


        <Route path='/help-center' element={<HelpCenter></HelpCenter>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;