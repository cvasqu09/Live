var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: { type: String, required: true },
  categories: {
    type: Array,
    required: true
  },
  eventIds: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  strikes: { type: Number },
  ICENumbers: [{ type: String }]
},
{ versionKey: false });

module.exports = mongoose.model('User', userSchema);
