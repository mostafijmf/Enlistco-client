import { Routes, Route } from "react-router-dom";
import RequireAuth from './Pages/Auth/RequireAuth/RequireAuth';
import RequireAdmin from './Pages/Auth/RequireAuth/RequireAdmin';
import RequirePayment from "./Pages/Auth/RequireAuth/RequirePayment";
import Home from './Pages/Home/Home';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import UserProfile from './Pages/Dashboard/UserProfile';
import HelpCenter from './Pages/Shared/HelpCenter';
import NotFound from './Pages/Shared/NotFound';
import Dashboard from './Pages/Dashboard/Dashboard';
import SeekerContactForm from './Pages/UserData/Form/SeekerContactForm';
import SeekerJobExperience from './Pages/UserData/Form/SeekerJobExperience';
import SeekerEducation from './Pages/UserData/Form/SeekerEducation';
import JobContactInfo from "./Pages/Employer/Form/JobContactInfo";
import JobDescription from './Pages/Employer/Form/JobDescription/JobDescription';
import ApplicationOptions from './Pages/Employer/Form/ApplicationOptions';
import JobPost from './Pages/Employer/JobPost/JobPost';
import UserRole from './Pages/UserData/UserRole';
import ManageJobPost from './Pages/Admin/Manage Job-post/ManageJobPost';
import SeekerApplications from "./Pages/Employer/Candidates/SeekerApplications";
import Resume from "./Pages/Employer/Candidates/Resume";
import CandidatesProfile from "./Pages/Employer/Candidates/CandidatesProfile";
import SendOfferLetter from "./Pages/Employer/Candidates/SendOfferLetter";
import JobDetails from "./Pages/Home/JobDetails";
import ManageJobSeekers from "./Pages/Admin/Manage Seekers/ManageJobSeekers";
import SeekerDetails from "./Pages/Admin/Manage Seekers/SeekerDetails";
import ActivateEmail from "./Pages/Auth/ActivateEmail";
import ResetPassword from "./Pages/Auth/ResetPassword";
import PaymentOptions from "./Pages/PaymentOptions/PaymentOptions";
import ManageEmployers from "./Pages/Admin/Manage Employers/ManageEmployers";
import EmployerDetails from "./Pages/Admin/Manage Employers/EmployerDetails";
import UserInfoForm from "./Pages/UserData/UserInfoForm";
import SeekerForm from "./Pages/UserData/Form/SeekerForm";
import SeekerResumeForm from "./Pages/UserData/Form/SeekerResumeForm";
import JobPostDetails from "./Pages/Employer/JobPost/JobPostDetails";
import EditPostForm from "./Pages/Employer/EditForm/EditPostForm";
import JobPostingForm from "./Pages/Employer/Form/JobPostingForm";
import JobReview from "./Pages/Employer/Form/JobReview/JobReview";
import ManageJobDetails from "./Pages/Admin/Manage Job-post/ManageJobDetails";
import ViewApplicants from "./Pages/Admin/Manage Job-post/ViewApplicants/ViewApplicants";
import SeekerAboutForm from "./Pages/UserData/Form/SeekerAboutForm";
import Applied from "./Pages/UserData/SeekerProfile/Applied";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
  return (
    <div className="bg-slate-100 text-gray-600">
      <Routes>
        {/* ====================
            Entry point or Home
        ==================== */}
        <Route path='/' element={<Home></Home>}>
          <Route path='/job/:id' element={<JobDetails></JobDetails>}></Route>
        </Route>


        {/* ====================
            User Authentication
        ==================== */}
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/user/activate/:activation_token' element={<ActivateEmail></ActivateEmail>}></Route>
        <Route path='/user/reset/:reset_token' element={<ResetPassword></ResetPassword>}></Route>

        {/* New register user */}
        <Route path='/user-role' element={
          <RequireAuth>
            <UserRole></UserRole>
          </RequireAuth>
        }></Route>
        <Route path='/user-information' element={
          <RequireAuth>
            <UserInfoForm></UserInfoForm>
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
          <Route path='/dashboard/manage-employers' element={
            <RequireAdmin>
              <ManageEmployers></ManageEmployers>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-employers/details' element={
            <RequireAdmin>
              <EmployerDetails></EmployerDetails>
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
          <Route path='/dashboard/manage-job/details/:id' element={
            <RequireAdmin>
              <ManageJobDetails></ManageJobDetails>
            </RequireAdmin>
          }></Route>
          <Route path='/dashboard/manage-job-post/view-applicants' element={
            <RequireAdmin>
              <ViewApplicants></ViewApplicants>
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
          <Route path='/dashboard/job' element={
            <RequireAuth>
              <JobPost></JobPost>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/job/details/:id' element={
            <RequireAuth>
              <JobPostDetails></JobPostDetails>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/job/edit/:id' element={
            <RequireAuth>
              <EditPostForm></EditPostForm>
            </RequireAuth>
          }></Route>
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
          <Route path='/dashboard/candidate-profile' element={
            <RequireAuth>
              <CandidatesProfile></CandidatesProfile>
            </RequireAuth>
          }></Route>
          <Route path='/dashboard/seeker-resume' element={
            <RequireAuth>
              <Resume></Resume>
            </RequireAuth>
          }></Route>

          <Route path='/dashboard/applied-jobs' element={
            <RequireAuth>
              <Applied></Applied>
            </RequireAuth>
          }></Route>

        </Route>

        {/* ====================
              Seeker Form
          ==================== */}
        <Route path='/form' element={
          <RequireAuth>
            <SeekerForm></SeekerForm>
          </RequireAuth>
        }>
          <Route path='/form/seeker-contact' element={
            <RequireAuth>
              <SeekerContactForm></SeekerContactForm>
            </RequireAuth>
          }></Route>
          <Route path='/form/seeker-about' element={
            <RequireAuth>
              <SeekerAboutForm></SeekerAboutForm>
            </RequireAuth>
          }></Route>
          <Route path='/form/job-experience' element={
            <RequireAuth>
              <SeekerJobExperience></SeekerJobExperience>
            </RequireAuth>
          }></Route>
          <Route path='/form/education' element={
            <RequireAuth>
              <SeekerEducation></SeekerEducation>
            </RequireAuth>
          }></Route>
          <Route path='/form/upload-resume' element={
            <RequireAuth>
              <SeekerResumeForm></SeekerResumeForm>
            </RequireAuth>
          }></Route>
        </Route>

        {/* ====================
              Employer job-post form
          ==================== */}
        <Route path='/job-form' element={
          <RequireAuth>
            <RequirePayment>
              <JobPostingForm></JobPostingForm>
            </RequirePayment>
          </RequireAuth>
        }>
          <Route path='/job-form/contact' element={
            <RequireAuth>
              <RequirePayment>
                <JobContactInfo></JobContactInfo>
              </RequirePayment>
            </RequireAuth>
          }></Route>
          <Route path='/job-form/description' element={
            <RequireAuth>
              <JobDescription></JobDescription>
            </RequireAuth>
          }></Route>
          <Route path='/job-form/application-options' element={
            <RequireAuth>
              <ApplicationOptions></ApplicationOptions>
            </RequireAuth>
          }></Route>
          <Route path='/job-form/review' element={
            <RequireAuth>
              <JobReview></JobReview>
            </RequireAuth>
          }></Route>
        </Route>

        <Route path='/payment' element={
          <RequireAuth>
            <PaymentOptions></PaymentOptions>
          </RequireAuth>
        }></Route>


        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<ContactUs></ContactUs>}></Route>
        <Route path='/help-center' element={<HelpCenter></HelpCenter>}></Route>
        <Route path='/*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;