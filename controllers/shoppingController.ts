const Shopping = require("../models/shopping");

exports.getAllSubscribers = (req, res, next) => {
    Shopping.find( {}, (error, shopping) => {
        if (error) next(error);
        req.data = shopping;
        next();
    });
};