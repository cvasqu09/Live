var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryValidator = function (categoryArray) {
  console.log('Category is: ' + categoryArray);
  console.log(categoryArray.length);
  if (categoryArray == null || categoryArray.length == 0) {
    return false;
  }
  return true;
};

var timeValidator = function (time) {
  if (time < 0 || time > 2400) {
    return false;
  }
  return true;
};

var eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    min: [1, 'Event name must be provided'],
    max: [40, 'Event name is too long']
  },
  categories: {
    type: Array,
    required: true,
    validate: {
      validator: categoryValidator,
      message: 'Categories cannot be empty.'
    }
  },
  numPeople: {
    type: Number,
    required: true,
    min: [1, 'Enter number of people for the event'],
    max: [20, 'Max of 20 people allowed for an event']
  },
  location: { type: [Number], index: '2dsphere', required: true },
  startTime: {
    type: Number,
    required: true,
    validate: {
      validator: timeValidator,
      message: 'Invalid time entered'
    }
  },
  endTime: {
    type: Number,
    required: true,
    validate: {
      validator: timeValidator,
      message: 'Invalid time'
    }
  },
  description: {
    type: String,
    max: [300, 'Description is too long. Max 300 characters']
  },
  eventOwner: { type: String, required: true },
  reports: { type: Number, default: 0 },
  rsvps: { type: Number, default: 0 },
  _id: { type: Schema.Types.ObjectId }
},
{ versionKey: false });

module.exports = mongoose.model('Event', eventSchema);
