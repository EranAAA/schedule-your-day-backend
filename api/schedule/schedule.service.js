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
      const collection = await dbService.getCollection('schedule')

      var schedules = await collection
         .find( { 'createdBy._id': ObjectId(userId) } )
         .toArray()

      console.log('userId ', userId);
      console.log('schedules length ', schedules.length);
      return schedules

   } catch (err) {
      logger.error('cannot find schedules', err)
      throw err
   }
}

async function getById(scheduleId) {
   try {
      const collection = await dbService.getCollection('schedule')
      const schedule = collection.findOne({ _id: ObjectId(scheduleId) })
      return schedule
   } catch (err) {
      logger.error(`while finding schedule ${scheduleId}`, err)
      throw err
   }
}

async function remove(scheduleId) {
   try {
      const collection = await dbService.getCollection('schedule')
      await collection.deleteOne({ _id: ObjectId(scheduleId) })
      return scheduleId
   } catch (err) {
      logger.error(`cannot remove schedule ${scheduleId}`, err)
      throw err
   }
}

async function add(schedule) {
   try {
      schedule.createdBy._id = ObjectId(schedule.createdBy._id)
      const collection = await dbService.getCollection('schedule')
      const addedSchedule = await collection.insertOne(schedule)
      return addedSchedule.ops[0]
   } catch (err) {
      logger.error('cannot insert schedule', err)
      throw err
   }
}

async function update(schedule) {
   try {
      var id = ObjectId(schedule._id)
      schedule.createdBy._id = ObjectId(schedule.createdBy._id)
      
      delete schedule._id
      const collection = await dbService.getCollection('schedule')
      await collection.updateOne({ _id: id }, { $set: { ...schedule } })
      return schedule
   } catch (err) {
      logger.error(`cannot update schedule ${scheduleId}`, err)
      throw err
   }
}

