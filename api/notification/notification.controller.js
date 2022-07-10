const notificationService = require('./notification.service.js')
const logger = require('../../services/logger.service')

module.exports = {
   getNotifications,
   getNotificationById,
   addNotification,
   updateNotification,
   removeNotification
}

async function getNotifications(req, res) {
   try {
      logger.debug('Getting Notifications')
      var { userId } = req.query || {}
      const notifications = await notificationService.query(userId)
      res.json(notifications)
   } catch (err) {
      logger.error('Failed to get notifications', err)
      res.status(500).send({ err: 'Failed to get notifications' })
   }
}

async function getNotificationById(req, res) {
   try {
      const notificationId = req.params.notificationId
      const notification = await notificationService.getById(notificationId)
      res.json(notification)
   } catch (err) {
      logger.error('Failed to get notification', err)
      res.status(500).send({ err: 'Failed to get notification' })
   }
}

async function addNotification(req, res) {
   try {
      const notification = req.body
      const addedNotification = await notificationService.add(notification)
      // res.json(addedNotification)
      res.send(addedNotification)
   } catch (err) {
      logger.error('Failed to add notification', err)
      res.status(500).send({ err: 'Failed to add notification' })
   }
}

async function updateNotification(req, res) {
   try {
      const notification = req.body
      const updatedNotification = await notificationService.update(notification)
      res.json(updatedNotification)
   } catch (err) {
      logger.error('Failed to update notification', err)
      res.status(500).send({ err: 'Failed to update notification' })
   }
}

async function removeNotification(req, res) {
   try {
      const notificationId = req.params.notificationId
      const removedId = await notificationService.remove(notificationId)
      res.send(removedId)
   } catch (err) {
      logger.error('Failed to remove notification', err)
      res.status(500).send({ err: 'Failed to remove notification' })
   }
}
