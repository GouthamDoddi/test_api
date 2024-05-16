import mongodb from 'mongodb';
import db from '../config/db.js';
import { console, successLogger, logger } from '../config/logger.js';


const { ObjectId } = mongodb;


export const insertUserSubscriptionDetails = async data => await db.collection('user_subscription_details').insertOne(data);

export const insertUerPayments = async data => {
    const { userId, session, amount, quantity, planStartDate,
        planEndDate, currency, isPlanActive, paymentBy, planType, planId, planDuration, planName } = data;

    console.log(`dates in insert = startDate = ${planStartDate}, planEndDate = ${planEndDate}`);

    const userPayments = db.collection('user_payments');
    // const userAccount = db.collection('user_account')


    const isertIntoDb = await userPayments.insertOne({
        userId,
        emailId: userId,
        session_id: session.id,
        transaction_date: new Date(),
        status: 'PENDING',
        amount: Number(amount) * Number(quantity),
        currency,
        planType,
        planStartDate,
        planEndDate,
        createdDate: new Date(),
        updatedDate: new Date(),
        session_url: session.url,
        isPlanActive,
        paymentBy,
        planId,
        planDuration,
        planName,
    });

    // const filter = { userId };
    // const options = { upsert: true };
    // const update = {
    //     $set: {
    //         isActive: isPlanActive,
    //         activeFrom: planStartDate,
    //         activeTill: planEndDate,
    //     },
    // };

    // userAccount.updateOne(filter, update, options)


    return isertIntoDb;
};

export const insertCounsellorFeedbackToMessageCenter = async data => {
    const { userId, from_userId, feedback } = data;

    const messageCenter = db.collection('user_messagecenter');

    const insertIntoDb = await messageCenter.insertOne({
        userId,
        from_userId,
        message_category: 'COUNSELOR FEEDBACK',
        message_title: 'COUNSELOR FEEDBACK',
        message_description: feedback,
        message_channel: 'INTERNAL',
        message_status: 'UNREAD',
        createdDate: new Date(),
        is_deleted: false,
        updatedDate: new Date(),
    });

    return insertIntoDb;
};

export const insertOneNotification = async data => {
    const { userId, userId_from, notification_category, notification_title, notification_description, notification_channel } = data;

    const insertData = {
        userId,
        notification_title,
        notification_category,
        notification_channel,
        notification_description,
        userId_from,
        createdDate: new Date(),
        notification_status: 'UNREAD',
        is_deleted: false,
        updatedDate: new Date(),
    };

    const notification = db.collection('user_notifications');

    const insertIntoDb = await notification.insertOne(insertData);

    return insertIntoDb;
};
