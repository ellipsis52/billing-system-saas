const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  planId: String,
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'expired'],
    default: 'active',
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'semi-annual', 'annual'],
    default: 'monthly',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  nextBillingDate: {
    type: Date,
    required: true,
  },
  autoRenew: {
    type: Boolean,
    default: true,
  },
  paymentMethod: {
    gateway: String,
    tokenId: String,
  },
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
  }],
  billingHistory: [{
    invoiceId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    billedAt: Date,
    paidAt: Date,
  }],
  cancellationReason: String,
  cancelledAt: Date,
  xeroSubscriptionId: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Index for queries
subscriptionSchema.index({ userId: 1, status: 1 });
subscriptionSchema.index({ customerId: 1 });
subscriptionSchema.index({ nextBillingDate: 1 });

module.exports = mongoose.model('Subscription', subscriptionSchema);