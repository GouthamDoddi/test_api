"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCounsellorRequests = exports.getAllAlerts = exports.getAllNotifications = exports.getAllMessages = exports.filterUsingManyObjIds = exports.filterUsingObjId = exports.sessionsPast = exports.sessionsToAttend = exports.sessionsToCounduct = void 0;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ObjectId = _mongodb["default"].ObjectId;

var sessionsToCounduct = function sessionsToCounduct(counsellorId) {
  return [{
    "$match": {
      "$and": [{
        "userId": counsellorId
      }, {
        "session_date": {
          $gte: new Date()
        }
      }, {
        "session_status": {
          $ne: "rescheduled"
        }
      }, {
        "session_status": {
          $ne: "cancelled"
        }
      }]
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "students": "$student_userIds"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$in": ["$userId", "$$students"]
          }
        }
      }],
      "as": "users"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "student_userIds": 1,
      "session_title": 1,
      "session_date": 1,
      "session_starttime": 1,
      "session_endtime": 1,
      "session_meeting_link": 1,
      "session_notes": 1,
      "session_actions": 1,
      // "session_rating":1,
      // "session_cost":1,
      "createdDate": 1,
      "updatedDate": 1,
      "session_type": 1,
      "meeting_type": 1,
      "session_max_count": 1,
      "session_status": 1,
      "users._id": 1,
      "users.userId": 1,
      "users.name": 1,
      "users.email": 1,
      "users.userPhoto": 1
    }
  }];
};

exports.sessionsToCounduct = sessionsToCounduct;

var sessionsToAttend = function sessionsToAttend(Id) {
  return [{
    "$match": {
      "$and": [{
        "student_userIds": Id
      }, {
        "session_date": {
          $gte: new Date()
        }
      }, {
        "session_status": "active"
      }]
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "counsellorId": "$userId"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$eq": ['$userId', '$$counsellorId']
          }
        }
      }],
      "as": "counsellor"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "session_title": 1,
      "session_date": 1,
      "session_starttime": 1,
      "session_endtime": 1,
      "session_meeting_link": 1,
      "session_notes": 1,
      "session_actions": 1,
      "session_rating": 1,
      "session_cost": 1,
      "createdDate": 1,
      "updatedDate": 1,
      "session_type": 1,
      "session_max_count": 1,
      "session_status": 1,
      "counsellor._id": 1,
      "counsellor.userId": 1,
      "counsellor.name": 1,
      "counsellor.email": 1,
      "counsellor.userPhoto": 1
    }
  }];
};

exports.sessionsToAttend = sessionsToAttend;

var sessionsPast = function sessionsPast(counsellorId) {
  return [{
    "$match": {
      "$and": [{
        "userId": counsellorId
      }, {
        "session_date": {
          $lt: new Date()
        }
      }]
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "students": "$student_userIds"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$in": ["$userId", "$$students"]
          }
        }
      }],
      "as": "users"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "student_ids": 1,
      "session_title": 1,
      "session_date": 1,
      "session_starttime": 1,
      "session_endtime": 1,
      "session_join_link": 1,
      "session_notes": 1,
      "session_actions": 1,
      "session_rating": 1,
      "session_cost": 1,
      "createdDate": 1,
      "updatedDate": 1,
      "session_type": 1,
      "session_max_count": 1,
      "session_status": 1,
      "users._id": 1,
      "users.userId": 1,
      "users.name": 1,
      "users.email": 1,
      "users.userPhoto": 1
    }
  }];
};

exports.sessionsPast = sessionsPast;

var filterUsingObjId = function filterUsingObjId(id) {
  _id: ObjectId("".concat(id));
};

exports.filterUsingObjId = filterUsingObjId;

var filterUsingManyObjIds = function filterUsingManyObjIds(ids) {
  var listOfOIds = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ids[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var id = _step.value;
      listOfOIds.push(ObjectId(id));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return {
    _id: {
      $in: listOfOIds
    }
  };
};

exports.filterUsingManyObjIds = filterUsingManyObjIds;

var getAllMessages = function getAllMessages(id) {
  return [{
    "$match": {
      userId: id,
      message_category: 'MESSAGE',
      is_deleted: false
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "fromUser": "$from_userId"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$eq": ["$userId", "$$fromUser"]
          }
        }
      }],
      "as": "from_user"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "message_title": 1,
      "chat_session_id": 1,
      "message_category": 1,
      "message_description": 1,
      "message_channel": 1,
      "from_userId": 1,
      "createdDate": 1,
      "message_status": 1,
      "updatedDate": 1,
      "is_deleted": 1,
      "from_user.userId": 1,
      "from_user._id": 1,
      "from_user.userPhoto": 1,
      "from_user.email": 1,
      "from_user.name": 1
    }
  }];
};

exports.getAllMessages = getAllMessages;

var getAllNotifications = function getAllNotifications(id) {
  return [{
    "$match": {
      userId: id,
      message_category: 'NOTIFICATION',
      is_deleted: false
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "fromUser": "$from_userId"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$eq": ["$userId", "$$fromUser"]
          }
        }
      }],
      "as": "from_user"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "message_title": 1,
      "chat_session_id": 1,
      "message_category": 1,
      "message_description": 1,
      "message_channel": 1,
      "from_userId": 1,
      "createdDate": 1,
      "message_status": 1,
      "updatedDate": 1,
      "is_deleted": 1,
      "from_user.userId": 1,
      "from_user._id": 1,
      "from_user.userPhoto": 1,
      "from_user.email": 1,
      "from_user.name": 1
    }
  }];
};

exports.getAllNotifications = getAllNotifications;

var getAllAlerts = function getAllAlerts(id) {
  return [{
    "$match": {
      userId: id,
      message_category: 'ALERT',
      is_deleted: false
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "fromUser": "$from_userId"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$eq": ["$userId", "$$fromUser"]
          }
        }
      }],
      "as": "from_user"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "message_title": 1,
      "chat_session_id": 1,
      "message_category": 1,
      "message_description": 1,
      "message_channel": 1,
      "from_userId": 1,
      "createdDate": 1,
      "message_status": 1,
      "updatedDate": 1,
      "is_deleted": 1,
      "from_user.userId": 1,
      "from_user._id": 1,
      "from_user.userPhoto": 1,
      "from_user.email": 1,
      "from_user.name": 1
    }
  }];
};

exports.getAllAlerts = getAllAlerts;

var getAllCounsellorRequests = function getAllCounsellorRequests(id) {
  return [{
    "$match": {
      userId: id,
      message_category: 'COUNSELLOR_REQUEST',
      is_deleted: false
    }
  }, {
    "$lookup": {
      "from": "user_profile",
      "let": {
        "fromUser": "$from_userId"
      },
      "pipeline": [{
        "$match": {
          "$expr": {
            "$eq": ["$userId", "$$fromUser"]
          }
        }
      }],
      "as": "from_user"
    }
  }, {
    "$project": {
      _id: {
        "$toString": "$_id"
      },
      "userId": 1,
      "message_title": 1,
      "chat_session_id": 1,
      "message_category": 1,
      "message_description": 1,
      "message_channel": 1,
      "from_userId": 1,
      "createdDate": 1,
      "message_status": 1,
      "updatedDate": 1,
      "is_deleted": 1,
      "from_user.userId": 1,
      "from_user._id": 1,
      "from_user.userPhoto": 1,
      "from_user.email": 1,
      "from_user.name": 1
    }
  }];
};

exports.getAllCounsellorRequests = getAllCounsellorRequests;