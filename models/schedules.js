const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scheduleSchema = new Schema(
  {
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule
