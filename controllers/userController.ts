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
        res.render("user/index");
    },
    new: (req:any, res:any) => {
        res.render("user/new");
    },
    
    create: async (req:any, res:any, next:any) => {
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
                res.locals.redirect = "/user"
                res.locals.user = user
                next()
            })
            .catch((error:Error) => {
                console.log(`Error saving user: ${error.message}`);
                next(error);
              })
    },
    update: async (req:any, res:any, next:any) => {
        const userId = req.params.id;
        const userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
        .then((user:any) => {
            res.locals.redirect = "/user"
            res.locals.user = user
            next();
        })
        .catch((error:Error) => {
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
      }
}