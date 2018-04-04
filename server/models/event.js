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

var eventSchema = new Schema({
  eventName: { type: String, required: true },
  categories: {
    type: Array,
    required: true,
    validate: {
      validator: categoryValidator,
      message: 'Categories cannot be empty.'
    }
  },
  numPeople: { type: Number, required: true },
  location: { type: [Number], index: '2dsphere', required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  description: { type: String }, // Limit the length?
  eventOwner: { type: String, required: true },
  reports: { type: Number, default: 0 },
  rsvps: { type: Number, default: 0 },
  _id: { type: Schema.Types.ObjectId }
},
{ versionKey: false });

module.exports = mongoose.model('Event', eventSchema);
