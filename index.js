require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Invoice = require('./model/invoice');
const email = require('./email');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb+srv://yelpcamp:kingmaker@wryth.y07gq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`)))
    .catch(() => console.log(`Database Not Connecting`));


app.get('/invoice', async (req, res) => {
    // return all the invoices;
    const invoices = await Invoice.find({});
    res.json(invoices);
})

app.post('/invoice/post', async (req, res) => {
    // post new invoice
    let obj = {};
    obj.status = 'not paid';
    obj = {...obj, ...req.body};
    
    let invoice =  Invoice(obj);

    invoice.save()
        .then((obj) => {
            res.json(obj);
        })
        .catch(() => res.send("Error!!!"));
})

app.put('/invoice/:id', async (req, res) => {
    // update the status of the invoice
    const ID = req.params.id;
    const obj = await Invoice.findByIdAndUpdate(ID, {status: req.body.status});
    res.send("Updated");
});

app.delete('/invoice/delete', async(req, res) => {
    const obj = await Invoice.deleteMany({});
    res.send(`No. of Entries Deleted: ${obj.deletedCount}`);
})

app.get('/email', email);

app.get('*', (req, res) => {
    res.send("Error: 404")
})