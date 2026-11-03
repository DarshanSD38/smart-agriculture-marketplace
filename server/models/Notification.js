import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    roleTarget: {
      type: String,
      enum: ['farmer', 'customer', 'labour', 'admin', 'all'],
      default: 'all'
    },
    type: {
      type: String,
      enum: [
        'new_order',
        'order_status',
        'price_alert',
        'demand_alert',
        'surplus_alert',
        'fresh_harvest',
        'job_alert',
        'crop_health_alert'
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ''
    },
    timestamp: {
      type: String,
      default: 'Just now'
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;

