const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
// Define Schemes
const wordSchema = new mongoose.Schema({
  id: { type: Number, required: true, default: 0 },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  word: { type: String, required: true },
  mean: { type: String, required: true }
}
,
{ collection: 'word' }
,
{
  timestamps: true
});

wordSchema.plugin(autoIncrement.plugin, {
  model: 'Word',
  field: 'id',
  startAt: 1, //시작
  increment: 1 // 증가
});


wordSchema.statics.create = function (payload) {
    // this === Model
    const word = new this(payload);
    // return Promise
    return word.save();
  };
  
  // Find All
  wordSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
  };
  
  // Find One by wordid
  wordSchema.statics.count = function (month,day) {
    return this.find({month, day});
  };
  
  // Update by wordid
  wordSchema.statics.updateBywordid = function (id, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ id }, payload, { new: true });
  };
  
  // Delete by wordid
  wordSchema.statics.deleteBywordid = function (id) {
    return this.deleteOne({ id });
  };



// Create Model & Export
module.exports = mongoose.model('Word', wordSchema);