import { NextFunction } from "express"; 
import { any } from "webidl-conversions";

const router = require("express").Router();
const shoppingController = require("../controllers/shoppingController");

const Shopping = require("../data/models/shopping");


module.exports = {
    index: (req:any, res:any, next:any) => {
        Shopping.find({})
            .then((shopping:any) => {
                res.locals.shopping = shopping;
                next();
            })
            .catch((error:Error) => {
                console.log(`Error fetching users: ${error.message}`);
            }
        );
    },
    indexView: (req:any, res:any) => {
        res.render("shopping/index");
    },
    new: (req:any, res:any) => {
        res.render("shopping/new");
    },
    
    create: async (req:any, res:any, next:any) => {
        let shopping = {
            item:req.body.item,
            quantity: req.body.quantity
        }
        Shopping.create(shopping)
            .then((shopping:any) => {
                res.locals.redirect = "/shopping"
                res.locals.shopping = shopping
                next()
            })
            .catch((error:Error) => {
                console.log(`Error saving shopping: ${error.message}`);
                next(error);
              })
    },
    redirectView: (req:any, res:any, next:any) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req:any, res:any, next:any) => {
        let shoppingid = req.params.id;
        Shopping.findById(shoppingid)
          .then((shopping:any) => {
            res.locals.shopping = shopping;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error fetching shopping by ID: ${error.message}`);
            next(error);
          });
      },
      showView: (req:any, res:any) => {
        res.render("shopping/show");
      },
        edit: (req:any, res:any, next:any) => {
            console.log("starting edit");
            var itemId = req.params.id;
            console.log(itemId);
            Shopping.findById(itemId)
                .then((shoppingdb:any) => {
                    res.locals.shopresult = shoppingdb;
                    res.render("shopping/edit");
                })
                .catch((error:any) => {
                    console.log(`Error fetching Item by ID:${error.message}`); 
                    next(error);
                }); 
            console.log("finishing edit");
        },

        update: (req:any, res:any, next:any) => {
            console.log("starting update");
            let itemId = req.params.id;
            let itemParams = {
                item:req.body.item,
                quantity: req.body.quantity
            }
            Shopping.findByIdAndUpdate(itemId, {
                $set: itemParams
                })
                .then((shopping:any) => { 
                    res.locals.redirect = `/shopping`;
                    res.locals.shopping = shopping;
                    next();
                })
                .catch((error:any) => {console.log(`Error updating shopping by ID: ${error.message}`);
                    next(error);
                });
                console.log("finishing update");
        },

        delete: (req:any, res:any, next:any) => {
            console.log("starting delete");
            let itemId = req.params.id;

            Shopping.findByIdAndRemove(itemId)
                .then(() => {
                    res.locals.redirect = "/shopping";
                    next();
                })
                .catch((error:any) => {
                    console.log(`Error deleting item by ID: ${error.message}`);
                    next(); 
                });
                console.log("finishing delete");
        } 
    
    };







/*
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
        quantity: req.body.quantity
    });

    console.log(newShopping);
    res.redirect("/shopping"); 
};

*/