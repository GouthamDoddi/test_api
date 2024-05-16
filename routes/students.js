import express from 'express';
import { getCounsellorWithFilters, updateMessageStatus } from '../controllers/counsellor.js';
import { userPaymentHistory } from '../controllers/payments.js';

const router = express.Router();

import { insertUserActivity, getStudentDetails, sendStudentMessage,
    getAllUserByCounsellor, sendEmail, getAllStudentLocations,
    listOfActiveUsersForCounsoler,
    counsellorRequest, studentViewdPlan,
    upcommintMeetingtToAttend,
    getMyCounselors, getAllUserByCounsellor2,
    getAllRegionalPlans, getStudentSubscriptionDetails, getCounsellorBasedOnStudentGeographyOfProgram, getAllRegionalPlanAddons } from '../controllers/students.js';
import { deleteMesssage, delete_multiple_messages,
    forgetPassword, getAlerts, getAllCountryCodeAndCountryFromSubcriptionPlans, getMessages,
    getNotifications, getMessagesWithFeedback } from '../controllers/users.js';

/* GET users listing. */


// these apis are for student screen
router.post('/get_students_list_for_counsellor', getAllUserByCounsellor);
router.post('/get_students_list_without_img', getAllUserByCounsellor2);
router.post('/get_student_details', getStudentDetails);
router.post('/send_email', sendEmail);
router.post('/get_all_student_locations', getAllStudentLocations);

router.post('/insert_user_activity', insertUserActivity);
router.post('/send_message', sendStudentMessage);
router.post('/get_active_students', listOfActiveUsersForCounsoler);
router.post('/get_messages', getMessagesWithFeedback);
router.post('/send_counsellor_request', counsellorRequest);

router.post('/get_notifications', getNotifications);
router.post('/get_alerts', getAlerts);
router.post('/delete_message', deleteMesssage);
router.post('/delete_notification', deleteMesssage);
router.post('/delete_alert', deleteMesssage);

router.post('/update_message_status', updateMessageStatus);
router.post('/update_notification_status', updateMessageStatus);
router.post('/update_alert_status', updateMessageStatus);

router.post('/upcomming_meetings', upcommintMeetingtToAttend);
router.post('/get_my_counsellor', getMyCounselors);
router.post('/find_counsellors', getCounsellorWithFilters);

router.post('/get_all_subscription_plans', getAllRegionalPlans);
router.post('/get_all_addon_plans', getAllRegionalPlanAddons);

router.post('/payment_history', userPaymentHistory);

router.post('/forget_password', forgetPassword);
router.post('/delete_multiple_messages', delete_multiple_messages);

router.get('/get_country_codes', getAllCountryCodeAndCountryFromSubcriptionPlans);

router.post('/get_student_subscription_detials', getStudentSubscriptionDetails);

router.post('/get_recomended_counsellors_for_student', getCounsellorBasedOnStudentGeographyOfProgram); // trigger push notification to student from counsellor recomending a counsellor


router.post('/view_plan', studentViewdPlan);


export default router;
