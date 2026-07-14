import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title for the todo item"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the todo item"],
        default: ""
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
