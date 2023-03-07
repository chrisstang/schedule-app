const router = require('express').Router()
let Schedule = require('../models/schedules')

// get all schedules
router.route('/').get((req, res) => {
  Schedule.find()
    .then((schedules) => {
      res.json(schedules)
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

// create a new schedule
router.route('/add').post((req, res) => {
  const date = req.body.date
  const time = req.body.time
  const description = req.body.description

  const newSchedule = new Schedule({
    date,
    time,
    description,
  })

  newSchedule
    .save()
    .then(() => res.json('Schedule added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// get a schedule by id
router.route('/:id').get((req, res) => {
  Schedule.findById(req.params.id)
    .then((schedule) => res.json(schedule))
    .catch((err) => res.status(400).json('Error: ' + err))
})

// update a schedule by id
router.route('/update/:id').post((req, res) => {
  Schedule.findById(req.params.id)
    .then((schedule) => {
      schedule.date = req.body.date
      schedule.time = req.body.time
      schedule.description = req.body.description

      schedule
        .save()
        .then(() => res.json('Schedule updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

// delete a schedule by id
router.route('/:id').delete((req, res) => {
  Schedule.findByIdAndDelete(req.params.id)
    .then(() => res.json('Schedule deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
