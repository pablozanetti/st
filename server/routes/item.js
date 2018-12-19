const express = require('express');
const Item = require('../models/item');
const app = express();

app.get('/item', function(req, res) {
    res.json('get Item')
});

app.post('/item', function(req, res) {

    let body = req.body;

    let item = new Item({
        name: body.name,
        amount: body.amount,
        lastAmountUpdate: body.lastAmountUpdate,
        price: body.price,
        lastPriceUpdate: body.lastPriceUpdate
    });
    item.save((err, itemDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            item: itemDB
        });

    });

});

app.put('/item/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    if (body.amount) {
        body.lastUpdateAmount = Date.now();
    }
    if (body.price) {
        body.lastUpdatePrice = Date.now();
    }
    Item.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, itemDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            item: itemDB
        });
    });
});

app.delete('/item', function(req, res) {
    res.json('delete Item')
});

module.exports = app;