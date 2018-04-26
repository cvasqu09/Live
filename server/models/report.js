var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reportSchema = new Schema({
  report: {
    type: String,
    required: true,
    min: [20, 'Please provide a review'],
    max: [120, 'Please provide a review within 120 characters']
  },
  eventId: {
  	type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  }
}, { versionKey: false });

module.exports = mongoose.model('Report', reportSchema);
