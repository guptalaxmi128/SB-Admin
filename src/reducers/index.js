import { combineReducers } from 'redux';
import auth from './admin/auth/auth';
import adminInstructor from './admin/adminInstructor/adminInstructor';
import adminStudent from './admin/adminStudent/adminStudent';
import adminCourse from './admin/course/course';
import addInstructor from './instructor/addInstructor';
import addInstructorCourse from './instructor/course/course';
import category from './admin/category/category';
import instructorCategory from './instructor/category/category';
import addInstructorContent from './instructor/content/content';
import content from './admin/content/content';
import addInstructorCoupon from './instructor/coupon/coupon';
import coupon from './admin/coupon/coupon';
import iDashboard from './instructor/dashboard/dashboard';
import iNotification from './instructor/notification/notification';
import aNotification from './admin/notification/notification';
import iReview from './instructor/review/review';
import aReview from './admin/review/review';
import student from './student/student';
import payment from './student/payment/payment';
import sCourse from './student/course/course';
import courseType from './admin/courseType/courseType';
import courseDuration from './admin/courseDuration/courseDuration';
import university from './admin/university/university';
import courseDurationType from './admin/courseDurationType/courseDurationType';
import yogaStudio from './admin/yogaStudio/yogaStudio';
import therapySpecialisation from './admin/therapySpecialisation/therapySpecialisation';
import htSpecialisation from './admin/htSpecialisation/htSpecialisation';
import banner from './admin/banner/banner';
import homeTutor from './admin/homeTutor/homeTutor';

export const reducers = combineReducers({
auth,
adminInstructor,
adminStudent,
adminCourse,
category,
content,
coupon,
aReview,
aNotification,
addInstructor,
addInstructorCourse,
instructorCategory,
addInstructorContent,
addInstructorCoupon,
iDashboard,
iNotification,
iReview,
student,
payment,
sCourse,
courseType,
courseDuration,
university,
courseDurationType,
yogaStudio,
therapySpecialisation,
htSpecialisation,
banner,
homeTutor


});
