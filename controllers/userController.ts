import { Console } from "console";
import e, { NextFunction, Request, Response } from "express";
const passport = require("passport");

const User = require("../data/models/user");
const token = process.env.TOKEN || "12345678";
const jsonwebtoken = require("jsonwebtoken");

const getUserParams = (body:any) => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password
    }
}


module.exports = {
    index: async (req:any, res:any, next:any) => {
        let users = await User.find({})
            .then((users:any) => {
                res.locals.users = users;
                next();
            })
            .catch((error:Error) => {
                console.log(`Error fetching users: ${error.message}`);
            }
        );
    },
    indexView: (req:any, res:any) => {
        if(req.query.format === "json") {
            return res.json(res.locals.users);
        } else {
            res.render("user/index", {
                flashMessages: {
                success: "Loaded all users!"
                }
            });
        }
    },
    new: (req:any, res:any) => {
        res.render("user/new");
    },
    create: async (req:any, res:any, next:any) => {
        if (req.skip) return next();
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error:Error, user:any) => {
        if (user) {
            req.flash("success", `${user.fullName}'s account created successfully!`);
            res.locals.redirect = "/users";
            next();
        } else {
            req.flash("error", `Failed to create user account because: ${error.message}.`);
            res.locals.redirect = "/users/new";
            next();
        }
        });
    },
    update: async (req:any, res:any, next:any) => {
        const userId = req.params.id;
        const userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
        .then((user:any) => {
            req.flash("success", `${user.fullName}'s account updated successfully!`)
            res.locals.redirect = "/users"
            res.locals.user = user
            next();
        })
        .catch((error:Error) => {
            req.flash("error", `Failed to update user account because: ${error.message}.`)
            console.log(`Error updating user by ID: ${error.message}`);
            next(error);
        });
    },
    delete: async (req:any, res:any, next:any) => {
        const userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = "/user"
                next();
            })
            .catch((error:Error) => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req:any, res:any, next:any) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req:any, res:any, next:any) => {
        let userId = req.params.id;
        User.findById(userId)
          .then((user:any) => {
            res.locals.user = user;
            next();
          })
          .catch((error:Error) => {
            console.log(`Error fetching user by ID: ${error.message}`);
            next(error);
          });
      },
      showView: (req:any, res:any) => {
        res.render("user/show");
      },
    login: (req:any, res:any) => {
        res.render("user/login");
    },
    authenticate: passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: "Failed to login.",
        successRedirect: "/",
        successFlash: "Logged in!"
    }),
    logout: (req:any, res:any, next:any) => {
        req.logout();
        req.flash("success", "You have been logged out!");
        res.locals.redirect = "/";
        next();
    },
    validate: (req:any, res:any, next:any) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim();
        req.check("email", "Email is invalid").isEmail();
        req.check("password", "Password cannot be empty").notEmpty();
        req.getValidationResult().then((error:any) => {
            if (!error.isEmpty()) {
                let messages = error.array().map((e:any) => e.msg);
                req.skip = true;
                req.flash("error", messages.join(" and "));
                res.locals.redirect = "/users/login";
                next();
            } else {
                next();
            }
        });
    },
    verifyToken: async (req:Request, res:Response, next:NextFunction) => {
        let token  = req.query.apiToken;
        if(token){
            User.findOne({apiToken: token})
                .then((user:any) => {
                    if(user) next();
                    else next(new Error("Invalid API Token"));
                }
            ).catch((error:Error) => {
                next(new Error(error.message));
            });
        }else{
            next(new Error("Invalid API Token"));
        }
    },
    apiAuthenticate: async (req:Request, res:Response, next:NextFunction) => {
        passport.authenticate("local", (errors:any, user:any) => {
            if(user){
                let signedToken = jsonwebtoken.sign(
                    {
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    "secret_encoding_passphrase"
                );
                res.json({
                    success: true,
                    token: signedToken
                });
            }else
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
        })(req, res, next); 
    },
    verifyJWT: async (req:Request, res:Response, next:NextFunction) => {
        let token = req.headers.token;
        if(token){
            jsonwebtoken.verify(token, "secret_encoding_passphrase",
             (error:any, payload:any) => {
                if(payload){
                    User.findById(payload.data).then((user:any) => {
                        if(user){
                            next();
                        }else{
                            res.status(httpStatus.FORBIDDEN).json({
                                success: false,
                                message: "No user account found."
                            });
                        }
                    });
                }else{
                    res.status(httpStatus.UNAUTHORIZED).json({
                        success: false,
                        message: "Cannot verify API token."
                    });
                    next();
                }
            });
        }else{
            res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Provide Token"
            });
        }
    },
}
