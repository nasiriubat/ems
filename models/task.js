const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['done', 'pending', 'extended'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    assignedTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    dueDate: {
      type: Date,
    },
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }]
  }, {
    timestamps: true
  });
  
  
  module.exports = mongoose.model('Task', TaskSchema);
  