const mongoose = require("mongoose");

interface ITodo {
    name: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

interface ITodoFunctions {
    getInfo(): string;
}   


const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank!"
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

/* todoSchema.method("getInfo", function getInfo() {
    return `Name: ${this.name} Completed: ${this.completed}`;
}); */
     

module.exports = mongoose.model("Todo", todoSchema);

