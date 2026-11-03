import Notification from '../models/Notification.js';

// @desc    Get notifications for user/role
// @route   GET /api/notifications
// @access  Private
export const getNotifications = async (req, res, next) => {
  try {
    const role = req.user?.role || req.query.role || 'farmer';

    const query = {
      $or: [
        { recipient: req.user._id },
        { roleTarget: role },
        { roleTarget: 'all' }
      ]
    };

    const notifications = await Notification.find(query).sort({ createdAt: -1 }).limit(50);

    const formatted = notifications.map(n => ({
      ...n.toObject(),
      id: n._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      notifications: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a single notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      notification: {
        ...notification.toObject(),
        id: notification._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    const role = req.user.role;
    await Notification.updateMany(
      {
        $or: [
          { recipient: req.user._id },
          { roleTarget: role },
          { roleTarget: 'all' }
        ]
      },
      { read: true }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    next(error);
  }
};

