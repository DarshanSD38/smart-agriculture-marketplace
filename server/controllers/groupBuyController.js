import GroupBuy from '../models/GroupBuy.js';

// @desc    Get all active group-buying campaigns
// @route   GET /api/group-buys
// @access  Public
export const getGroupBuys = async (req, res, next) => {
  try {
    const deals = await GroupBuy.find({ status: 'Active' });

    const formatted = deals.map(d => ({
      ...d.toObject(),
      id: d._id.toString()
    }));

    res.json({
      success: true,
      count: formatted.length,
      groupBuys: formatted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Customer joins a group-buying pool
// @route   POST /api/group-buys/:id/join
// @access  Private (Customer)
export const joinGroupBuy = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const qty = Number(quantity) || 1;

    const deal = await GroupBuy.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        success: false,
        message: 'Group buy campaign not found'
      });
    }

    if (deal.status !== 'Active') {
      return res.status(400).json({
        success: false,
        message: 'This group buying campaign is no longer active'
      });
    }

    deal.currentDemandPledged += qty;
    deal.remainingQuantity = Math.max(0, deal.groupQuantityRequired - deal.currentDemandPledged);
    deal.participantsCount += 1;
    deal.participants.push({
      user: req.user._id,
      quantity: qty,
      pledgedAt: new Date()
    });

    if (deal.remainingQuantity === 0) {
      deal.status = 'Completed';
    }

    await deal.save();

    res.json({
      success: true,
      message: `Successfully pledged ${qty} ${deal.unit} to the ${deal.productName} group buy pool!`,
      groupBuy: {
        ...deal.toObject(),
        id: deal._id.toString()
      }
    });
  } catch (error) {
    next(error);
  }
};

