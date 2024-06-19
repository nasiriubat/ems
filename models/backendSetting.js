const mongoose = require('mongoose');

const BackendSettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('BackendSetting', BackendSettingSchema);
