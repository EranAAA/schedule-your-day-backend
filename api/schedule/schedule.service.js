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

async function query(filterBy) {
   try {
      const criteria = _buildCriteria(filterBy)
      const criteriaSort = _buildCriteriaSort(filterBy)
      const collection = await dbService.getCollection('schedule')

      var schedules = await collection
         .find(criteria)
         .sort(criteriaSort)
         .toArray()
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
      delete schedule._id
      const collection = await dbService.getCollection('schedule')
      await collection.updateOne({ _id: id }, { $set: { ...schedule } })
      return schedule
   } catch (err) {
      logger.error(`cannot update schedule ${scheduleId}`, err)
      throw err
   }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  const selectedOption = filterBy.selectedOption
    ? filterBy.selectedOption.map(({ value, ...rest }) => value)
    : []

  if (filterBy.name) {
    criteria.name = { $regex: filterBy.name, $options: 'i' }
  }

  if (filterBy.stock || filterBy.stock === false) {
    criteria.inStock = filterBy.stock
  }

  return criteria
}

function _buildCriteriaSort(filterBy) {
  const criteria = {}

  if (filterBy.sort === 'Higher') {
    criteria.price = -1
  }

  if (filterBy.sort === 'Lower') {
    criteria.price = 1
  }

  if (filterBy.sort === 'Newest') {
    criteria.createdAt = -1
  }

  if (filterBy.sort === 'Oldest') {
    criteria.createdAt = 1
  }

  if (!Object.keys(criteria).length) {
    criteria.createdAt = -1
  }

  return criteria
}

