const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    invoiceNo: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    products: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        required: true
    },
    gst: {
        type: Number,
        default: 0
    },
    sgst: {
        type: Number,
        default: 0
    },
    igst: {
        type: Number,
        default: 0
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    points: {
        type: String,
    },
    customer: {
        name: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
});
module.exports = mongoose.model('Invoice', InvoiceSchema);