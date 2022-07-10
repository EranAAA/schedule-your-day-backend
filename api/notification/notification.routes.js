const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getNotifications, getNotificationById, addNotification, updateNotification, removeNotification } = require('./notification.controller')
const router = express.Router()

router.get('/', log, getNotifications)
router.get('/:notificationId', getNotificationById)
router.post('/', requireAuth, /*requireAdmin,*/ addNotification)
router.put('/:notificationId', requireAuth, /*requireAdmin,*/ updateNotification)
router.delete('/:notificationId', requireAuth, /*requireAdmin,*/ removeNotification)

module.exports = router
