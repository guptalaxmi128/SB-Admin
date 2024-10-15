import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/",
  baseURL:'https://swasti.onrender.com/'
});

api.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).authToken
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginAdmin = (userInfo) => api.post(`api/admin/login`, userInfo);
export const addAdminInstructor = (userInfo) => {
  return api.post(
    `api/admin/registerInstructor`,
    userInfo
    //  {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
};

export const getAdminInstructor = (params) =>
  api.get(`api/admin/instructor`, { params });
export const approveInstructor = (id) => {
  return api.put(`api/admin/approveInstructorProfile/${id}`);
};
export const declineInstructor = (id) => {
  return api.put(`api/admin/rejectInstructorProfile/${id}`);
};

export const addAdminStudent = (userInfo) => {
  return api.post(
    `api/admin/registerStudent`,
    userInfo
    //  {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
  );
};

export const getHeart = () => api.get(`api/admin/heartAPI`);
export const getAdminStudent = () => api.get(`api/admin/student`);

export const getAdminCourse = (status) =>
  api.get(`api/admin/courses`, {
    params: {
      approvalStatusByAdmin: status,
    },
  });

export const addAdminCourse = (formData) => {
  return api.post(`api/admin/addCourse`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// export const getAdminInstructorCourse = (status) => {
//   return api.get(`api/admin/pendingRejectCourses`, {
//     params: {
//       approvalStatusByAdmin: status,
//     },
//   });
// };

export const courseStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeCourseStatus/${id}`, status);
};

export const contentStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeContentStatus/${id}`, status);
};

export const fileStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeCourseFileStatus/${id}`, status);
};

export const addCategory = (category) =>
  api.post(`api/admin/createCourseCategory`, category);
export const getCategory = () => api.get(`api/admin/courseCategories`);
export const deleteCategory = (id) =>
  api.delete(`api/admin/deleteCourseCategory/${id}`);

export const deleteInstructor = (id) =>
  api.delete(`api/admin/softDeleteInstructor/${id}`);
export const getDeletedInstructor = () =>
  api.get(`api/admin/softDeletedInstructors`);
export const restoreInstructor = (id) => {
  return api.put(`api/admin/restoreInstructor/${id}`);
};

export const updateQualificationStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeQualificationStatus/${id}`, status);
};
export const getAdminInstructorById = (id) =>
  api.get(`api/admin/instructor/${id}`);

export const deleteStudent = (id) =>
  api.delete(`api/admin/softDeleteStudent/${id}`);
export const getDeletedStudent = () => api.get(`api/admin/deletedStudents`);
export const restoreStudent = (id) => {
  return api.put(`api/admin/restoreStudent/${id}`);
};
export const verifyStudent = (id) => {
  return api.put(`api/admin/verifyStudent/${id}`);
};

export const getCourseById = (id) => api.get(`api/admin/courses/${id}`);

export const deleteAdminQualification = (id) =>
  api.delete(`api/admin/softDeleteQualification/${id}`);
export const deleteAdminExperience = (id) =>
  api.delete(`api/admin/softDeleteExperienceAdmin/${id}`);
export const restoreAdminQualification = (id) => {
  return api.put(`api/admin/restoreQualification/${id}`);
};
export const restoreAdminExperience = (id) => {
  return api.put(`api/admin/restoreExperienceAdmin/${id}`);
};
export const getDeletedExperience = (id) =>
  api.get(`api/admin/softDeletedExperience/${id}`);
export const getDeletedQualification = (id) =>
  api.get(`api/admin/softDeletedQualification/${id}`);

export const addAdminCourseContent = (title) => {
  return api.post(`api/admin/addContent`, title);
};

export const coursePublish = ({ id, ...publish }) => {
  return api.put(`api/admin/coursePublish/${id}`, publish);
};

export const contentPublish = ({ id, ...publish }) => {
  return api.put(`api/admin/contentPublish/${id}`, publish);
};
export const filePublish = ({ id, ...publish }) => {
  return api.put(`api/admin/filePublish/${id}`, publish);
};

export const getContentById = (id) => api.get(`api/admin/files/${id}`);

export const addAdminVideo = ({ id, ...video }) => {
  return api.post(`api/admin/addContentVideo/${id}`, video);
};

export const addAdminFile = (formData) => {
  const id = formData.get("id");
  formData.delete("id");
  return api.post(`api/admin/addContentFile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addCoupon = (coupon) => api.post(`api/admin/createCoupon`, coupon);

export const getCoupon = () => api.get(`api/admin/coupon`);

export const deleteCoupon = (id) =>
  api.delete(`api/admin/softDeleteCoupon/${id}`);

export const getDeletedCoupon = () => api.get(`api/admin/deletedCoupons`);

export const restoreCoupon = (id) => {
  return api.put(`api/admin/restoreCoupon/${id}`);
};

export const deleteCourse = (id) =>
  api.delete(`api/admin/softDeleteCourse/${id}`);

export const deleteContent = (id) =>
  api.delete(`api/admin/softDeleteContent/${id}`);

export const deleteFile = (id) => api.delete(`api/admin/softDeleteFile/${id}`);

export const couponStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeCouponStatus/${id}`, status);
};

export const getDeletedCourse = () => api.get(`api/admin/softDeletedCourse`);

export const restoreCourse = (id) => {
  return api.put(`api/admin/restoreCourse/${id}`);
};
export const restoreContent = (id) => {
  return api.put(`api/admin/restoreContent/${id}`);
};

export const restoreFile = (id) => {
  return api.put(`api/admin/restoreFile/${id}`);
};

export const couponToCourse = ({ id, ...couponId }) => {
  return api.put(`api/admin/addCouponToCourse/${id}`, couponId);
};

export const addANotification = (notification) =>
  api.post(`api/admin/createNotification`, notification);

export const getANotification = () => api.get(`api/admin/notifications`);
export const notificationStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeNotificationStatus/${id}`, status);
};

export const getAReview = (id) =>
  api.get(`api/admin/getInstructorReview/${id}`);
export const deleteAReview = (id) =>
  api.delete(`api/admin/deleteInstructorReview/${id}`);
export const getAAverageRating = (id) =>
  api.get(`api/admin/getInstructorAverageRating/${id}`);

export const assignCourse = ({ id, ...course }) =>
  api.post(`api/admin/studentToCourse/${id}`, course);

export const getACourseReview = (id) =>
  api.get(`api/admin/getCourseReview/${id}`);
export const getACourseAverageRating = (id) =>
  api.get(`api/admin/getCourseAverageRating/${id}`);

export const getTotalCourse = () => api.get(`api/admin/totalCourse`);
export const getDraftCourse = () => api.get(`api/admin/totalDraftedCourse`);
export const getPendingCourse = () => api.get(`api/admin/totalPendingCourse`);
export const getPublishedCourse = () =>
  api.get(`api/admin/totalPublishedCourse`);
export const getVerifiedCourse = () => api.get(`api/admin/totalVerifiedCourse`);
export const getATotalStudent = () => api.get(`api/admin/totalStudent`);
export const getTotalInstructor = () => api.get(`api/admin/totalInstructor`);

export const addCourseType = (coursetype) =>
  api.post(`api/admin/createCourseType`, coursetype);
export const getCourseType = () => api.get(`api/admin/courseTypes`);
export const deleteCourseType = (id) =>
  api.delete(`api/admin/deleteCourseType/${id}`);

export const addCourseDuration = (duration) =>
  api.post(`api/admin/createCourseDuration`, duration);
export const getCourseDuration = () => api.get(`api/admin/courseDurations`);
export const deleteCourseDuration = (id) =>
  api.delete(`api/admin/deleteCourseDuration/${id}`);

export const addCourseDurationType = (duration) =>
  api.post(`api/admin/createCourseDurationType`, duration);
export const getCourseDurationType = () =>
  api.get(`api/admin/courseDurationTypes`);
export const deleteCourseDurationType = (id) =>
  api.delete(`api/admin/deleteCourseDurationType/${id}`);

export const addUniversity = (university) =>
  api.post(`api/admin/university_institute`, university);
export const getUniversity = () => api.get(`api/admin/university_institutes`);
export const deleteUniversity = (id) =>
  api.delete(`api/admin/university_institute/${id}`);
export const getParticularUniversity = () => api.get(`api/admin/university`);
export const getParticularInstitute= (params) =>
  api.get(`api/admin/institutes`, { params });

export const addTherapySpecialisation = (specialisation) =>
  api.post(`api/admin/addTherapySpecilization`, specialisation);
export const getTherapySpecialisation = () =>
  api.get(`api/admin/therapySpecilizations`);
export const deleteTherapySpecialisation = (id) =>
  api.delete(`api/admin/deleteTherapySpecilization/${id}`);

export const addHTSpecialisation = (specialisation) =>
  api.post(`api/admin/addHTSpecilization`, specialisation);
export const getHTSpecialisation = () => api.get(`api/admin/hTSpecilizations`);
export const deleteHTSpecialisation = (id) =>
  api.delete(`api/admin/deleteHTSpecilization/${id}`);

export const addBanner = (bannerInfo) =>
  api.post(`api/admin/addAdminBanner`, bannerInfo);
export const getBanner = () => api.get(`api/admin/adminBanners`);
export const deleteBanner = (id) =>
  api.delete(`api/admin/deleteAdminBanner/${id}`);

export const getHomeTutor = () => api.get(`api/admin/homeTutors`);
export const deleteHomeTutor = (id) =>
  api.delete(`api/admin/softDeleteHomeTutor/${id}`);
export const deleteHomeTutorImage = (id) =>
  api.delete(`api/admin/softDeleteHTutorImage/${id}`);
export const deleteHomeTutorSlot = (id) =>
  api.delete(`api/admin/softDeleteHTutorTimeSlote/${id}`);
export const deleteHomeTutorLocation = (id) =>
  api.delete(`api/admin/softDeleteHTutorServiceArea/${id}`);
export const getHomeTutorById = (id) => api.get(`api/admin/homeTutors/${id}`);
export const getUpdationRequest = (id) =>
  api.get(`api/admin/hTutorUpdationRequest/${id}`);

export const homeTutorStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeHomeTutorStatus/${id}`, status);
};

export const homeTutorUpdationStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeHTutorUpdationStatus/${id}`, status);
};
export const getHomeTutorDateSlot = (id, date) =>
  api.get(`api/admin/hTTimeSlote/${id}`, {
    params: { date },
  });

/* Instructor */

export const loginInstructor = (userInfo) =>
  api.post(`api/instructor/login`, userInfo);
export const addInstructor = (userInfo) =>
  api.post(`api/instructor/register`, userInfo);
export const verifyOtp = (userInfo) =>
  api.post(`api/instructor/verifyOTP`, userInfo);
export const getInstructor = () => api.get(`api/instructor/instructor`);
export const addInstructorCourse = (formData) => {
  return api.post(`api/instructor/addCourse`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInstructorCategory = () =>
  api.get(`api/instructor/coursecategories`);
export const updateInstructor = (formData) => {
  return api.put(`api/instructor/updateInstructor`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const addInstructorQualification = (formData) => {
  return api.post(`api/instructor/addQualification`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addInstructorExperience = (experience) => {
  return api.post(`api/instructor/addExperience`, experience);
};

export const updateInstructorQualification = (formData) => {
  const id = formData.get("id");
  formData.delete("id");
  return api.put(`api/instructor/updateQualification/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateInstructorExperience = ({ id, ...experience }) => {
  return api.put(`api/instructor/updateExperiencen/${id}`, experience);
};

export const deleteInstructorQualification = (id) =>
  api.delete(`api/instructor/deleteQualification/${id}`);
export const deleteInstructorExperience = (id) =>
  api.delete(`api/instructor/deleteExperienceInstructor/${id}`);
export const getInstructorQualificationById = (id) =>
  api.get(`api/instructor/qualification/${id}`);
export const getInstructorExperienceById = (id) =>
  api.get(`api/instructor/experience/${id}`);
export const getInstructorCourseById = (id) =>
  api.get(`api/instructor/courses/${id}`);

export const addInstructorCourseContent = (title) => {
  return api.post(`api/instructor/addContent`, title);
};

export const instructorCoursePublish = ({ id, ...publish }) => {
  return api.put(`api/instructor/coursePublish/${id}`, publish);
};

export const instructorContentPublish = ({ id, ...publish }) => {
  return api.put(`api/instructor/contentPublish/${id}`, publish);
};

export const addInstructorVideo = ({ id, ...video }) => {
  return api.post(`api/instructor/addContentVideo/${id}`, video);
};

export const addInstructorFile = (formData) => {
  const id = formData.get("id");
  formData.delete("id");
  return api.post(`api/instructor/addContentFile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInstructorContentById = (id) =>
  api.get(`api/instructor/files/${id}`);
export const instructorFilePublish = ({ id, ...publish }) => {
  return api.put(`api/instructor/filePublish/${id}`, publish);
};

export const getInstructorOtherCourse = (params) => {
  return api.get(`api/instructor/courses`, { params });
};

// for submit button in courses
export const courseSubmit = (id) => {
  return api.put(`api/instructor/submitCourseForApproval/${id}`);
};

export const contentSubmit = (id) => {
  return api.put(`api/instructor/submitContentForApproval/${id}`);
};

export const contentFileSubmit = (id) => {
  return api.put(`api/instructor/submitFileForApproval/${id}`);
};

export const addInstructorCoupon = (coupon) =>
  api.post(`api/instructor/createCoupon`, coupon);

export const getInstructorCoupon = (params) =>
  api.get(`api/instructor/coupons`, { params });

export const deleteInstructorCoupon = (id) =>
  api.delete(`api/instructor/softDeleteCoupon/${id}`);

export const deleteInstructorCourse = (id) =>
  api.delete(`api/instructor/softDeleteCourse/${id}`);

export const deleteInstructorContent = (id) =>
  api.delete(`api/instructor/softDeleteContent/${id}`);

export const deleteInstructorFile = (id) =>
  api.delete(`api/instructor/softDeleteFile/${id}`);

export const addCouponToCourse = ({ id, ...couponId }) => {
  return api.put(`api/instructor/addCouponToCourse/${id}`, couponId);
};

export const getInstructorTotalCourses = () =>
  api.get(`api/instructor/totalCourse`);
export const getInstructorDraftCourses = () =>
  api.get(`api/instructor/totalDraftedCourse`);
export const getInstructorOngoingCourses = () =>
  api.get(`api/instructor/totalOngoingCourse`);
export const getInstructorStudent = () =>
  api.get(`api/instructor/totalStudent`);

export const addINotification = (notification) =>
  api.post(`api/instructor/createNotification`, notification);

export const getINotification = () => api.get(`api/instructor/notifications`);
export const getNotification = (params) =>
  api.get(`api/instructor/myNotifications`, { params }); //My Notification
export const getIReview = (params) =>
  api.get(`api/instructor/getInstructorReview`, { params });
export const deleteIReview = (id) =>
  api.delete(`api/instructor/deleteInstructorReview/${id}`);

export const getIAverageRating = () =>
  api.get(`api/instructor/getInstructorAverageRating`);

export const getICourseReview = (id) =>
  api.get(`api/instructor/getCourseReview/${id}`);
export const getICourseAverageRating = (id) =>
  api.get(`api/instructor/getCourseAverageRating/${id}`);

// student

export const registerStudent = (userInfo) =>
  api.post(`api/student/register`, userInfo);

export const verifyRStudent = (userInfo) =>
  api.post(`api/student/verifyOTPByLandingPage`, userInfo);

export const getCourse = () => api.get(`api/student/courses`);
export const getSCourse = (id) => api.get(`api/student/courses/${id}`);

export const addPayment = (payment) =>
  api.post(`api/student/createOrder`, payment);

export const applyCouponCourse = (coupon) => {
  return api.put(`api/student/applyCouponToCourse`, coupon);
};

export const getYogaStudio = () => api.get(`api/admin/yogaStudios`);
export const yogaStudioStatus = ({ id, ...status }) => {
  return api.put(`api/admin/changeYogaStudioBusiness/${id}`, status);
};
