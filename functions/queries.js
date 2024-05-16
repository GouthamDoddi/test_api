import mongodb from 'mongodb';
import { console, successLogger, logger } from '../config/logger.js';

const { ObjectId } = mongodb;

export const sessionsToCounduct = counsellorId => [
    { $match: {
        $and: [
            { userId: counsellorId },
            { session_date: { $gte: new Date() } },
            { session_status: { $ne: 'rescheduled' } },
            { session_status: { $ne: 'cancelled' } },
        ],
    } },
    { $lookup: {
        from: 'user_profile',
        let: { students: '$student_userIds' },
        pipeline: [
            { $match:
             { $expr:
                     { $in: [ '$userId', '$$students' ] } } },
        ],
        as: 'users',
    } },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            student_userIds: 1,
            session_title: 1,
            session_date: 1,
            session_starttime: 1,
            session_endtime: 1,
            session_meeting_link: 1,
            session_notes: 1,
            session_actions: 1,
            // "session_rating":1,
            // "session_cost":1,
            createdDate: 1,
            updatedDate: 1,
            session_type: 1,
            meeting_type: 1,
            session_max_count: 1,
            session_status: 1,
            'users._id': 1,
            'users.userId': 1,
            'users.name': 1,
            'users.email': 1,
            'users.userPhoto': 1,

        },

    },

];

export const sessionsToAttend = Id => [
    { $match: {
        $and: [
            { student_userIds: Id },
            { session_date: { $gte: new Date() } },
            { session_status: 'active' },
        ],
    } },
    { $lookup: {
        from: 'user_profile',
        let: { counsellorId: '$userId' },
        pipeline: [
            {
                $match:
                 { $expr:
                 { $eq: [ '$userId', '$$counsellorId' ] } },
            },
        ],
        as: 'counsellor',
    } },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            session_title: 1,
            session_date: 1,
            session_starttime: 1,
            session_endtime: 1,
            session_meeting_link: 1,
            session_notes: 1,
            session_actions: 1,
            session_rating: 1,
            session_cost: 1,
            createdDate: 1,
            updatedDate: 1,
            session_type: 1,
            session_max_count: 1,
            session_status: 1,
            'counsellor._id': 1,
            'counsellor.userId': 1,
            'counsellor.name': 1,
            'counsellor.email': 1,
            'counsellor.userPhoto': 1,

        },

    },

];

export const sessionsPast = counsellorId => [
    { $match: {
        $and: [
            { userId: counsellorId },
            { session_date: { $lt: new Date() } },
        ],
    } },
    { $lookup: {
        from: 'user_profile',
        let: { students: '$student_userIds' },
        pipeline: [
            { $match:
             { $expr:
                     { $in: [ '$userId', '$$students' ] } } },
        ],
        as: 'users',
    } },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            student_ids: 1,
            session_title: 1,
            session_date: 1,
            session_starttime: 1,
            session_endtime: 1,
            session_join_link: 1,
            session_notes: 1,
            session_actions: 1,
            session_rating: 1,
            session_cost: 1,
            createdDate: 1,
            updatedDate: 1,
            session_type: 1,
            session_max_count: 1,
            session_status: 1,
            'users._id': 1,
            'users.userId': 1,
            'users.name': 1,
            'users.email': 1,
            'users.userPhoto': 1,

        },

    },

];

export const filterUsingObjId = id => {
    ObjectId(`${id}`);
};

export const filterUsingManyObjIds = ids => {
    const listOfOIds = [];

    for (const id of ids)
        listOfOIds.push(ObjectId(id));


    return { _id: { $in: listOfOIds } };
};

export const getAllMessages = id => [
    {
        $match:
                { userId: id, message_category: 'MESSAGE', is_deleted: false },
    },
    {
        $lookup: {
            from: 'user_profile',
            let: { fromUser: '$from_userId' },
            pipeline: [
                { $match:
            { $expr:
                  { $eq: [ '$userId', '$$fromUser' ] } } },
            ],
            as: 'from_user',
        },
    },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            message_title: 1,
            chat_session_id: 1,
            message_category: 1,
            message_description: 1,
            message_channel: 1,
            from_userId: 1,
            createdDate: 1,
            message_status: 1,
            updatedDate: 1,
            is_deleted: 1,
            'from_user.userId': 1,
            'from_user._id': 1,
            "from_user.userPhoto":1,
            'from_user.email': 1,
            'from_user.name': 1,
        },

    },
];

export const getAllMessagesWithFeedback = id => [
    {
        $match:
                { userId: id, message_category: { $in: [ 'MESSAGE', 'COUNSELOR FEEDBACK' ] }, is_deleted: false },
    },
    {
        $lookup: {
            from: 'user_profile',
            let: { fromUser: '$from_userId' },
            pipeline: [
                { $match:
            { $expr:
                  { $eq: [ '$userId', '$$fromUser' ] } } },
            ],
            as: 'from_user',
        },
    },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            message_title: 1,
            chat_session_id: 1,
            message_category: 1,
            message_description: 1,
            message_channel: 1,
            from_userId: 1,
            createdDate: 1,
            message_status: 1,
            updatedDate: 1,
            is_deleted: 1,
            'from_user.userId': 1,
            'from_user._id': 1,
            "from_user.userPhoto":1,
            'from_user.email': 1,
            'from_user.name': 1,
        },

    },
];

/* export const getAllFromMessagesWithToUserId = (fromId, toId) => [
    {
        "$match":
                { from_userId: fromId, userId: toId, message_category: 'MESSAGE', is_deleted: false }
    },
    {
    "$lookup": {
        "from": "user_profile",
        "let": { "fromUser": "$from_userId" },
        "pipeline": [
        { "$match":
            { "$expr":
                  { "$eq": [ "$userId", "$$fromUser" ] }
          }
       }
     ],
             "as": "from_user"
       },
    },
    {
        "$project" : {
            _id: {
                "$toString": "$_id"
             },
            "userId":1,
            "message_title":1,
            "chat_session_id":1,
            "message_category":1,
            "message_description":1,
            "message_channel":1,
            "from_userId":1,
            "createdDate":1,
            "message_status":1,
            "updatedDate":1,
            "is_deleted": 1,
            "from_user.userId":1,
            "from_user._id":1,
            "from_user.userPhoto":1,
            "from_user.email":1,
            "from_user.name":1,
        }

    }
]
*/
export const getAllNotifications = id => [
    {
        $match:
                { userId: id, message_category: 'NOTIFICATION', is_deleted: false },
    },
    {
        $lookup: {
            from: 'user_profile',
            let: { fromUser: '$from_userId' },
            pipeline: [
                { $match:
            { $expr:
                  { $eq: [ '$userId', '$$fromUser' ] } } },
            ],
            as: 'from_user',
        },
    },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            message_title: 1,
            chat_session_id: 1,
            message_category: 1,
            message_description: 1,
            message_channel: 1,
            from_userId: 1,
            createdDate: 1,
            message_status: 1,
            updatedDate: 1,
            is_deleted: 1,
            'from_user.userId': 1,
            'from_user._id': 1,
            'from_user.userPhoto': 1,
            'from_user.email': 1,
            'from_user.name': 1,
        },

    },
];

export const getAllAlerts = id => [
    {
        $match:
                { userId: id, message_category: 'ALERT', is_deleted: false },
    },
    {
        $lookup: {
            from: 'user_profile',
            let: { fromUser: '$from_userId' },
            pipeline: [
                { $match:
            { $expr:
                  { $eq: [ '$userId', '$$fromUser' ] } } },
            ],
            as: 'from_user',
        },
    },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            message_title: 1,
            chat_session_id: 1,
            message_category: 1,
            message_description: 1,
            message_channel: 1,
            from_userId: 1,
            createdDate: 1,
            message_status: 1,
            updatedDate: 1,
            is_deleted: 1,
            'from_user.userId': 1,
            'from_user._id': 1,
            'from_user.userPhoto': 1,
            'from_user.email': 1,
            'from_user.name': 1,
        },

    },
];

export const getAllCounsellorRequests = id => [
    {
        $match:
                { userId: id, message_category: 'COUNSELLOR_REQUEST', is_deleted: false },
    },
    {
        $lookup: {
            from: 'user_profile',
            let: { fromUser: '$from_userId' },
            pipeline: [
                { $match:
            { $expr:
                  { $eq: [ '$userId', '$$fromUser' ] } } },
            ],
            as: 'from_user',
        },
    },
    {
        $project: {
            _id: {
                $toString: '$_id',
            },
            userId: 1,
            message_title: 1,
            chat_session_id: 1,
            message_category: 1,
            message_description: 1,
            message_channel: 1,
            from_userId: 1,
            createdDate: 1,
            message_status: 1,
            updatedDate: 1,
            is_deleted: 1,
            'from_user.userId': 1,
            'from_user._id': 1,
            'from_user.userPhoto': 1,
            'from_user.email': 1,
            'from_user.name': 1,
        },
    },
];
