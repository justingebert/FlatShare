const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req:any, res:any) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("error");
}; 

exports.internalServerError = (error:any, req:any, res:any, next:any) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR; 
    console.log(`ERROR occurred: ${error.stack}`); 
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, this page is currently in prison!`);
}; 

