import { Int32 } from "mongodb";

const mongoose = require("mongoose");

  
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
    password: {
        type: String,
        required: "Password is required"
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

module.exports = mongoose.model("User", userSchema);