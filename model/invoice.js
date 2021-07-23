const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    name: String,
    expense: Number,
    status: String,
    notes: Object
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;

//export default invoice;