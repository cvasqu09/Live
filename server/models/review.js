var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  reviewText: {
    type: String,
    required: true,
    min: [1, 'Please provide a review'],
    max: [300, 'Please provide a review within 300 characters']
  },
  userId: {
    type: String, ref: 'User'
  }
}, { versionKey: false });

module.exports = mongoose.model('Review', reviewSchema);
