import { NextFunction } from "express"; 

const fs = require('fs');
const Documents = require("../data/models/documents");

exports.getAllDocuments = (req:any, res:any) => {
    Documents.find({})
        .then((documents:any) => {
            //console.log(todos)
            return res.render("documents", {
                documents: documents
              });
        })
        .catch((error:Error) => {
        console.log(`Error fetching documents: ${error.message}`);

    });
};

exports.saveDocuments = async (req:any, res:any) => {
    let newDocuments = await Documents.create({
        name: req.body.name,
        path: req.body.path
    });

    console.log(newDocuments);
    res.redirect("/documents");
};