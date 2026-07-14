import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo, getTodoById, toggleTodo } from "../controllers/todo.controller.js";

const route = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
route.get("/getTodos", getTodos);
/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create Todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo Created
 */
route.post("/createTodo", createTodo);
/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get Todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
route.get("/getTodos/:id", getTodoById);
/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update Todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo Updated
 */
route.put("/updateTodo/:id", updateTodo);

/**
 * @swagger
 * /api/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle Todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo Toggled
 */
route.patch("/toggleTodo/:id/toggle", toggleTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete Todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo Deleted
 */
route.delete("/deleteTodo/:id", deleteTodo);

export default route;