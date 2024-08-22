const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    toAccountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    type: {
        type: String,
        enum: ['deposit', 'withdraw', 'transfer'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['completed', 'reverted'],
        default: 'completed',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
