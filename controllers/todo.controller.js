import mongoose from "mongoose";
import Todo from "../models/todo.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// Create a new todo item   
export const createTodo = asyncHandler(async (req, res) => {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const todo = await  Todo.create({
            title,
            description
        });
        res.status(201).json(todo);
    
});
// Get all todo items
export const getTodos = asyncHandler(async (req,res) => {
        // Query params
        const {search, sort,page=1, limit=10} = req.query;

        // Base query

        let query = {};
        
        if(search){
            query.title = {$regex: search, $options: "i"};
        }

        // sorting
        let sortOption = {};

        if(sort === "asc"){
            sortOption.createdAt = 1;
        }else if(sort === "desc"){
            sortOption.createdAt = -1;
        };

        // Pagination
        const skip = (page - 1) * limit;

        const todos = await Todo.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

            const totalTodos = await Todo.countDocuments(query);
            return res.status(200).json({
                success: true,
                data: todos,
                total: totalTodos,
                page: Number(page),
                limit: Number(limit),
                message: "Todos fetched successfully"
            });
    
});
// Get Todo by ID
export const getTodoById = asyncHandler(async (req,res) => {    
        const {id} = req.params;

        // Validate ID based on Mongoose ObjectId format
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const todo = await Todo.findById(id);

        // If Todo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }
        
        // If Todo found

        return res.status(200).json({
            success: true,
            data: todo,
            message: "Todo fetched successfully"
        });
    });
// Update a todo item by ID
export const updateTodo = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;

        // Validate ID based on Mongoose ObjectId format
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID"
            });
        }

        // Validate input
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        // update Todo item
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );
        // ifTodo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // If Todo updated successfully
        return res.status(200).json({
            success: true,
            data: todo,
            message: "Todo updated successfully"
        });
        
});
// Toggle TODO by Id
export const toggleTodo = asyncHandler(async (req, res) => {
    const {id} =req.params;
 // Validate ID based on Mongoose ObjectId format
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID"
            });
        }

        // Get current todo item by ID
        const todo = await Todo.findById(id);
        // if todo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // Toggle the isCompleted field
        todo.isCompleted = !todo.isCompleted;
        await todo.save();

        // If Todo toggled successfully
        return res.status(200).json({
            success: true,
            data: todo,
            message: "Todo toggled successfully"
        });
        
});
// Delete a todo item by ID
export const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // Validate ID based on Mongoose ObjectId format
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
                success: false,
                message: "Invalid Todo ID"
            });
        }

        // Delete Todo item
        const todo = await Todo.findByIdAndDelete(id);
        // if Todo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        // If Todo deleted successfully
        return res.status(200).json({
            success: true,
            data: todo,
            message: "Todo deleted successfully"
        });
        
});

