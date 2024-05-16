"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertOneNotification = exports.insertCounsellorFeedbackToMessageCenter = exports.insertUerPayments = exports.insertUserSubscriptionDetails = void 0;

var _mongodb = _interopRequireDefault(require("mongodb"));

var _db = _interopRequireDefault(require("../config/db.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongodb["default"].ObjectId;

var insertUserSubscriptionDetails = function insertUserSubscriptionDetails(data) {
  return regeneratorRuntime.async(function insertUserSubscriptionDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_db["default"].collection('user_subscription_details').insertOne(data));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.insertUserSubscriptionDetails = insertUserSubscriptionDetails;

var insertUerPayments = function insertUerPayments(data) {
  var userId, session, amount, quantity, planStartDate, planEndDate, currency, isPlanActive, paymentBy, planType, planId, planDuration, planName, userPayments, isertIntoDb;
  return regeneratorRuntime.async(function insertUerPayments$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = data.userId, session = data.session, amount = data.amount, quantity = data.quantity, planStartDate = data.planStartDate, planEndDate = data.planEndDate, currency = data.currency, isPlanActive = data.isPlanActive, paymentBy = data.paymentBy, planType = data.planType, planId = data.planId, planDuration = data.planDuration, planName = data.planName;
          console.log("dates in insert = startDate = ".concat(planStartDate, ", planEndDate = ").concat(planEndDate));
          userPayments = _db["default"].collection('user_payments'); // const userAccount = db.collection('user_account')

          _context2.next = 5;
          return regeneratorRuntime.awrap(userPayments.insertOne({
            userId: userId,
            emailId: userId,
            session_id: session.id,
            transaction_date: new Date(),
            status: 'PENDING',
            amount: Number(amount) * Number(quantity),
            currency: currency,
            planType: planType,
            planStartDate: planStartDate,
            planEndDate: planEndDate,
            createdDate: new Date(),
            updatedDate: new Date(),
            session_url: session.url,
            isPlanActive: isPlanActive,
            paymentBy: paymentBy,
            planId: planId,
            planDuration: planDuration,
            planName: planName
          }));

        case 5:
          isertIntoDb = _context2.sent;
          return _context2.abrupt("return", isertIntoDb);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.insertUerPayments = insertUerPayments;

var insertCounsellorFeedbackToMessageCenter = function insertCounsellorFeedbackToMessageCenter(data) {
  var userId, from_userId, feedback, messageCenter, insertIntoDb;
  return regeneratorRuntime.async(function insertCounsellorFeedbackToMessageCenter$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = data.userId, from_userId = data.from_userId, feedback = data.feedback;
          messageCenter = _db["default"].collection('user_messagecenter');
          _context3.next = 4;
          return regeneratorRuntime.awrap(messageCenter.insertOne({
            userId: userId,
            from_userId: from_userId,
            message_category: 'MESSAGE',
            message_title: 'COUNSELOR FEEDBACK',
            message_description: feedback,
            message_channel: 'INTERNAL',
            message_status: 'UNREAD',
            createdDate: new Date(),
            is_deleted: false,
            updatedDate: new Date()
          }));

        case 4:
          insertIntoDb = _context3.sent;
          return _context3.abrupt("return", insertIntoDb);

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.insertCounsellorFeedbackToMessageCenter = insertCounsellorFeedbackToMessageCenter;

var insertOneNotification = function insertOneNotification(data) {
  var userId, userId_from, notification_category, notification_title, notification_description, notification_channel, insertData, notification, insertIntoDb;
  return regeneratorRuntime.async(function insertOneNotification$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          userId = data.userId, userId_from = data.userId_from, notification_category = data.notification_category, notification_title = data.notification_title, notification_description = data.notification_description, notification_channel = data.notification_channel;
          insertData = {
            userId: userId,
            notification_title: notification_title,
            notification_category: notification_category,
            notification_channel: notification_channel,
            notification_description: notification_description,
            userId_from: userId_from,
            createdDate: new Date(),
            notification_status: 'UNREAD',
            is_deleted: false,
            updatedDate: new Date()
          };
          notification = _db["default"].collection('user_notifications');
          _context4.next = 5;
          return regeneratorRuntime.awrap(notification.insertOne(insertData));

        case 5:
          insertIntoDb = _context4.sent;
          return _context4.abrupt("return", insertIntoDb);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.insertOneNotification = insertOneNotification;