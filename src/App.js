import React,{ useEffect} from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InstructorProfile from "./components/admin/instructorProfile/InstructorProfile";
import StudentProfile from "./components/admin/studentProfile/StudentProfile";
import MyLayout from "./components/admin/layout/MyLayout";
import Login from "./components/admin/login/Login";
// instructor
import Register from "./components/instructorPanel/register/Register";
import InstructorLayout from "./components/instructorPanel/layout/InstructorLayout";
import InstructorLogin from "./components/instructorPanel/login/InstructorLogin";
import "./App.css";
import MainLayout from "./components/admin/content/MainLayout";
import ShowQualification from "./components/instructorPanel/profile/ShowQualification";
import ShowExperience from "./components/instructorPanel/profile/ShowExperience";
import TabQualification from "./components/admin/qualification/TabQualification";
import TabExperience from "./components/admin/experience/TabExperience";
import CurriculumLayout from "./components/instructorPanel/content/CurriculumLayout";
import SubContentPreview from "./components/instructorPanel/subcontent/SubContentPreview";
import SubContentLayout from "./components/instructorPanel/subcontent/SubContentLayout";
import ASubContentPreview from "./components/admin/subcontent/ASubContentPreview";
import ASubContentLayout from "./components/admin/subcontent/ASubContentLayout";
import LandingPage from "./components/landingPage/LandingPage";
import CourseDetails from "./components/courseDetails/CourseDetails";
import Review from "./components/admin/review/Review";
import CourseReview from "./components/instructorPanel/courseReview/CourseReview";
import CourseAReview from "./components/admin/courseAReview/CourseAReview";
import PricePage from "./components/landingPage/PricePage";
import Home from "./components/home/Home";
import { getHeart } from './actions/admin/heart/heart';
import ParticularHomeTutor from './components/homeTutor/ParticularHomeTutor';


function App() {
const dispatch=useDispatch();
const startHeartAPITimer = () => {
  const heartAPITimer = setInterval(() => {
    dispatch(getHeart()); 
  }, 5 * 60 * 1000); // 5 minutes in milliseconds

  return heartAPITimer; 
};

// Call startHeartAPITimer when the component mounts
useEffect(() => {
  const timerId = startHeartAPITimer(); 
  return () => clearInterval(timerId); 
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<MyLayout />} />
        <Route path="/admin/maincurriculum/:id" element={<MainLayout />} />
        <Route
          path="/admin/instructor-verification/:id"
          element={<TabQualification />}
        />
        <Route
          path="/admin/instructor-verification/experience/:id"
          element={<TabExperience />}
        />
        <Route path="/admin/review/:id" element={<Review />} />
        <Route path="instructor/course-review/:id" element={<CourseReview />} />
        <Route path="admin/course-review/:id" element={<CourseAReview />} />
        <Route path="/qualification/:id" element={<ShowQualification />} />
        <Route path="/experience/:id" element={<ShowExperience />} />
        <Route
          path="/instructor/maincurriculum/:id"
          element={<CurriculumLayout />}
        />
        <Route path="/profile/instructor/:id" element={<InstructorProfile />} />
        <Route path="/subcontent/:id" element={<SubContentPreview />} />
        <Route path="/subcontent/:id/*" element={<SubContentLayout />} />
        <Route path="/lecture/:id" element={<ASubContentPreview />} />
        <Route path="/lecture/:id/*" element={<ASubContentLayout />} />
        <Route path="/profile/student/:id" element={<StudentProfile />} />
        <Route path="/register_instructor" element={<Register />} />
        <Route path="/login_instructor" element={<InstructorLogin />} />
        <Route path="/instructor/*" element={<InstructorLayout />} />
        <Route path="/15-days-yvc" element={<LandingPage />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/price/:id" element={<PricePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-tutor/:id" element={<ParticularHomeTutor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
