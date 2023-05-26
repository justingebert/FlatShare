import { NextFunction } from "express"; 

const Shopping = require("../data/models/shopping");

exports.getAllShopping = (req:any, res:any) => {
    Shopping.find({})
        .then((shopping:any) => {
            //console.log(todos)
            return res.render("shopping", {
                shopping: shopping
              });
        })
        .catch((error:Error) => {
        console.log(`Error fetching shopping: ${error.message}`);

    });
};

exports.saveShopping = async (req:any, res:any) => {
    let newShopping = await Shopping.create({
        item: req.body.item,
        quantity: 0
    });

    console.log(newShopping);
    res.redirect("/shopping");

};