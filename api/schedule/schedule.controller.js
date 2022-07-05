const scheduleService = require('./schedule.service.js')
const logger = require('../../services/logger.service')

module.exports = {
   getSchedules,
   getScheduleById,
   addSchedule,
   updateSchedule,
   removeSchedule
}

async function getSchedules(req, res) {
   try {
      logger.debug('Getting Schedules')
      var { userId } = req.query || {}
      const schedules = await scheduleService.query(userId)
      res.json(schedules)
   } catch (err) {
      logger.error('Failed to get schedules', err)
      res.status(500).send({ err: 'Failed to get schedules' })
   }
}

async function getScheduleById(req, res) {
   try {
      const scheduleId = req.params.scheduleId
      const schedule = await scheduleService.getById(scheduleId)
      res.json(schedule)
   } catch (err) {
      logger.error('Failed to get schedule', err)
      res.status(500).send({ err: 'Failed to get schedule' })
   }
}

async function addSchedule(req, res) {
   try {
      const schedule = req.body
      const addedSchedule = await scheduleService.add(schedule)
      // res.json(addedSchedule)
      res.send(addedSchedule)
   } catch (err) {
      logger.error('Failed to add schedule', err)
      res.status(500).send({ err: 'Failed to add schedule' })
   }
}

async function updateSchedule(req, res) {
   try {
      const schedule = req.body
      const updatedSchedule = await scheduleService.update(schedule)
      res.json(updatedSchedule)
   } catch (err) {
      logger.error('Failed to update schedule', err)
      res.status(500).send({ err: 'Failed to update schedule' })
   }
}

async function removeSchedule(req, res) {
   try {
      const scheduleId = req.params.scheduleId
      const removedId = await scheduleService.remove(scheduleId)
      res.send(removedId)
   } catch (err) {
      logger.error('Failed to remove schedule', err)
      res.status(500).send({ err: 'Failed to remove schedule' })
   }
}
