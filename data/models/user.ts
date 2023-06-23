import { Int32 } from "mongodb";
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Todo = require("./todo");
const passportLocalMongoose = require("passport-local-mongoose");

  
const userSchema = mongoose.Schema({
    name: {
        first:{
            type: String,
            trim: true,
            required: "First name is required"
        },
        last:{
            type: String,
            trim: true,
            required: "Last name is required"
        }
    },
    email:{
        type: String,
        required: "Email is required",
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo"
    }]
},{
    timestapmps: true
});

userSchema.virtual("fullName").get(function(this: any) {
        return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next:any) {
    let user = this;

    if (user.todos.length < 1) {
        Todo.find({
            user: user._id
        })
        .then((todos:any) => {
            user.todos = todos;
            next();
        })
    } else {
        next();
    }
});

/* userSchema.pre("save", function(next:any) {
    let user = this;
    bcrypt.hash(user.password, 10)
        .then((hash:any) => {
            user.password = hash;
            console.log(`Hashed password: ${user.password}`)
            next();
        })
        .catch((error:Error) => {
            console.log(`Error hashing password for user ${user.fullName}: ${error.message}`);
            next(error);
        });
});

userSchema.methods.passwordComparison = function(inputPassword:any) {
    let user = this;
    return bcrypt.compare(inputPassword, user.password);
} */

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
})


module.exports = mongoose.model("User", userSchema);