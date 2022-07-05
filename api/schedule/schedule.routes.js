const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getSchedules, getScheduleById, addSchedule, updateSchedule, removeSchedule } = require('./schedule.controller')
const router = express.Router()

router.get('/', log, getSchedules)
router.get('/:scheduleId', getScheduleById)
router.post('/', /*requireAuth, requireAdmin,*/ addSchedule)
router.put('/:scheduleId', /*requireAuth, requireAdmin,*/ updateSchedule)
router.delete('/:scheduleId', /*requireAuth, requireAdmin,*/ removeSchedule)

module.exports = router
