import { Console } from "console";

const User = require("../data/models/user");

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
        res.render("user/index", {
            flashMessages: {
              success: "Loaded all users!"
            }
          });
    },
    new: (req:any, res:any) => {
        res.render("user/new");
    },
    create: async (req:any, res:any, next:any) => {
        console.log("starting create")
        let user = {
            name:{
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            password: req.body.password,
        }
        User.create(user)
            .then((user:any) => {
                req.flash("success", `${user.fullName}'s account created successfully!`)
                res.locals.redirect = `/user/${user._id}`
                res.locals.user = user
                next()
            })
            .catch((error:Error) => {
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/user/new"
                req.flash("error", `Failed to create user account because: ${error.message}.`)
                next();
              })
            console.log("ending create")
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
    authenticate: (req:any, res:any, next:any) => {
        User.findOne({
            email: req.body.email
        })
        .then((user:any) => {
            if (user) {
                user.passwordComparison(req.body.password)
                .then((passwordsMatch:any) => {
                    if (passwordsMatch) {
                        res.locals.redirect = `/user/${user._id}`;
                        req.flash("success", `${user.fullName}'s logged in successfully!`);
                        res.locals.user = user;
                    } else {
                        
                        req.flash("error", "Failed to log in user account: Incorrect Password");
                        res.locals.redirect = "/users/login";
                    }
                    next();
                });
            } else {
                req.flash("error", "Failed to log in user account: User account not found");
                res.locals.redirect = "/user/login";
                next();
            }
        })
            .catch((error:Error) => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
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
                res.locals.redirect = "/user/login";
                next();
            } else {
                next();
            }
        });
    }
}