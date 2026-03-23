const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  subscriptionId: {
    type: String,
    unique: true,
    required: true,
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
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  billingCycle: {
    type: String,
    enum: ['monthly', 'quarterly', 'semi-annual', 'annual'],
    default: 'monthly',
  },
  status: {
    type: String,
    enum: ['active', 'paused', 'cancelled', 'pending', 'failed'],
    default: 'pending',
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
  paymentMethodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  },
  autoRenew: {
    type: Boolean,
    default: true,
  },
  failureCount: {
    type: Number,
    default: 0,
  },
  lastPaymentDate: Date,
  xeroSynced: {
    type: Boolean,
    default: false,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);