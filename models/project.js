const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Project name is required']
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
    },
    employees: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }]
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Project', ProjectSchema);
  