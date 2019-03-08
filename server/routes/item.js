const express = require('express');
const Item = require('../models/item');
const app = express();
const _ = require('underscore');

app.get('/item', function(req, res) {

    let from = req.query.from || 0;  
    from = Number(from);
    let limit = req.query.limit || 10;
    limit = Number(limit);
    let condition = {};
    Item.find(condition, 'name amount')      
            .limit(limit)
            .skip(from)
            .exec( (err, items) => {

                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }  
                
                Item.count(condition, (err, count) => {
                    res.json({
                        ok: true,
                        items,
                        count
                    });
    
                })


            })
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
    let body = _.pick( req.body, ['name', 'amount', 'price'] );

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

app.delete('/item/:id', function(req, res) {
    
    let id = req.params.id;

    Item.findByIdAndRemove(id, (err, deletedItem) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            item: deletedItem
        });

    });
});

module.exports = app;