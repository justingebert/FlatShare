import { NextFunction } from "express"; 

const fs = require('fs');
const Documents = require("../data/models/documents");
const getDocumentParams = (body:any) => {
    return {
      title: body.title,
      path: body.path,
      category: body.category,
    };
  };

module.exports = {
    index: (req:any, res:any, next:any) => {
        Documents.find()
          .then((documents:any) => {
            res.locals.documents = documents;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error fetching documents: ${error.message}`);
            next(error);
          });
      },
    
      indexView: (req:any, res:any) => {
        res.render("documents/index");
      },
    
      new: (req:any, res:any) => {
        res.render("documents/new");
      },
    
      create: (req:any, res:any, next:any) => {
        let documentParams = getDocumentParams(req.body);
        Documents.create(documentParams)
          .then((document:any) => {
            res.locals.redirect = "/documents";
            res.locals.document = document;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error saving document: ${error.message}`);
            next(error);
          });
      },
    
      redirectView: (req:any, res:any, next:any) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) res.redirect(redirectPath);
        else next();
      },
    
      show: (req:any, res:any, next:any) => {
        let documentId = req.params.id;
        Documents.findById(documentId)
          .then((document:any) => {
            res.locals.document = document;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error fetching document by ID: ${error.message}`);
            next(error);
          });
      },
    
      showView: (req:any, res:any) => {
        res.render("/documents/show");
      },
    
      update: (req:any, res:any, next:any) => {
        let documentId = req.params.id,
          documentParams = getDocumentParams(req.body);
    
        Documents.findByIdAndUpdate(
          documentId,
          {
            $set: documentParams
          },
          { new: true }
        )
          .then((document:any) => {
            res.locals.redirect = `/documents/${documentId}`;
            res.locals.document = document;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error updating document by ID: ${error.message}`);
            next(error);
          });
      },
    
      delete: (req:any, res:any, next:any) => {
        let documentsId = req.params.id;
        Documents.findByIdAndRemove(documentsId)
          .then(() => {
            res.locals.redirect = "/documents";
            next();
          })
          .catch((error:Error) => {
            console.log(`Error deleting document by ID: ${error.message}`);
            next();
          });
      }
    };


//index
/*
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
};*/