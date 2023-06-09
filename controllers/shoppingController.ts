import { NextFunction } from "express"; 

const Shopping = require("../data/models/shopping");

module.exports = {
    index: async (req:any, res:any, next:any) => {
        let shopping = await Shopping.find({})
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
        User.findById(shoppingid)
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
            var shoppingid = req.params.id;
            Shopping.findById(shoppingid)
                .then(Shopping => {
                    res.render("shopping/edit", {
                        Shopping: shopping
                    });
                })
                .catch(error => {
                    console.log(`Error fetching shopping by ID:${error.message}`); 
                    next(error);
                }); 
        },

        update: (req:any, res:any, next:any) => {
            let shoppingid = req.params.id,
                shoppingParams = getShoppingParams(req.body);
            Shopping.findByIdAndUpdate(shoppingid, {
                $set: shoppingParams
                })
                .then(shopping => {
                    res.locals.redirect = `/shopping/${shoppingid}`;
                    res.locals.shopping = shopping;
                    next();
                    })
                    .catch(error => {console.log(`Error updating shopping by ID: ➥ ${error.message}`);
                    next(error);
                    });
        },


        delete: (req:any, res:any, next:any) => {
            let shoppingid = req.params.id;
            Shopping.findByIdAndRemove(shoppingid)
                .then(() => {
                    res.locals.redirect = "/shopping";
                    next();
                })
                .catch(error => {
                    console.log(`Error deleting shopping by ID: ${error.message}`);
                    next(); 
                });
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