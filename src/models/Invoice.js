const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
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
  status: {
    type: String,
    enum: ['draft', 'sent', 'viewed', 'paid', 'overdue', 'cancelled'],
    default: 'draft',
  },
  lineItems: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    taxRate: { type: Number, default: 0 },
    amount: Number,
  }],
  subtotal: {
    type: Number,
    required: true,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  issueDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  paymentTerms: String,
  notes: String,
  xeroInvoiceId: String,
  xeroStatus: String,
  xeroSyncedAt: Date,
  payments: [{
    paymentId: mongoose.Schema.Types.ObjectId,
    amount: Number,
    date: Date,
    method: String,
  }],
  reminders: [{
    sentAt: Date,
    type: { type: String, enum: ['first', 'second', 'third'] },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Index for faster queries
invoiceSchema.index({ userId: 1, createdAt: -1 });
invoiceSchema.index({ customerId: 1 });
invoiceSchema.index({ status: 1 });

module.exports = mongoose.model('Invoice', invoiceSchema);