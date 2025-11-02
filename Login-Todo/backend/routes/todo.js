const express = require('express');
const router = express.Router();
const Todo = require('../model/todomodel');

// Create Todo
router.post('/', async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle todo completion status
router.patch('/toggle/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update todo
router.patch('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;