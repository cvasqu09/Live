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

var startDateValidator = function (startDate) {
  currentTime = Date.now();
  diffInMilli = startDate.getTime() - currentTime;
  diffInDays = diffInMilli / (1000 * 60 * 60 * 24);

  if (diffInDays <= 2 && diffInDays > 0) {
    return true;
  }
  return false;
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
  address: {
    type: String,
    required: true
  },
  location: { type: [Number], index: '2dsphere', required: true },
  start: {
    type: Date,
    required: true,
    validate: {
      validator: startDateValidator,
      message: 'Invalid date entered'
    }
  },
  end: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    max: [300, 'Description is too long. Max 300 characters']
  },
  eventOwner: { type: String, required: true, ref: 'User' },
  reports: { type: Number, default: 0 },
  rsvps: {
    numRsvps: { type: Number, default: 0 },
    rsvpUsers: [{ type: String, ref: 'User' }] // Array of user ids which are strings
  },
  _id: { type: Schema.Types.ObjectId }
},
{ versionKey: false });

eventSchema.pre('validate', function (next) {
  diffInMilli = this.end.getTime() - this.start.getTime();
  diffInDays = diffInMilli / (1000 * 60 * 60 * 24);
  if (diffInDays <= 2 && diffInDays > 0) {
    next();
  }
  next(new Error('Invalid end date given. Make sure end date is within 2 days of the start date.'));
});

module.exports = mongoose.model('Event', eventSchema);
