const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
   remove,
   query,
   getById,
   add,
   update
}

async function query(userId) {
   try {
      const collection = await dbService.getCollection('notification')

      console.log('userId ', userId);
      var notifications = await collection
         .find( { userId: userId } )
         .toArray()

      console.log('notifications length ', notifications.length);
      return notifications

   } catch (err) {
      logger.error('cannot find notifications', err)
      throw err
   }
}

async function getById(notificationId) {
   try {
      const collection = await dbService.getCollection('notification')
      const notification = collection.findOne({ _id: ObjectId(notificationId) })
      return notification
   } catch (err) {
      logger.error(`while finding notification ${notificationId}`, err)
      throw err
   }
}

async function remove(notificationId) {
   try {
      const collection = await dbService.getCollection('notification')
      await collection.deleteOne({ _id: ObjectId(notificationId) })
      return notificationId
   } catch (err) {
      logger.error(`cannot remove notification ${notificationId}`, err)
      throw err
   }
}

async function add(notification) {
   try {
      const collection = await dbService.getCollection('notification')
      const addedNotification = await collection.insertOne(notification)
      return addedNotification.ops[0]
   } catch (err) {
      logger.error('cannot insert notification', err)
      throw err
   }
}

async function update(notification) {
   try {
      var id = ObjectId(notification._id)
      notification.createdBy._id = ObjectId(notification.createdBy._id)
      
      delete notification._id
      const collection = await dbService.getCollection('notification')
      await collection.updateOne({ _id: id }, { $set: { ...notification } })
      return notification
   } catch (err) {
      logger.error(`cannot update notification ${notificationId}`, err)
      throw err
   }
}

