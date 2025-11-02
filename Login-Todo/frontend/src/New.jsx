import React, { useState, useEffect } from 'react';
import axios from 'axios';

const New = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '' });
    const [editingTodo, setEditingTodo] = useState(null);
    
    const BASE_URL = 'http://localhost:3000';

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/todos`);
            setTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/todos`, newTodo);
            setTodos([...todos, response.data]);
            setNewTodo({ title: '', description: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await axios.patch(`${BASE_URL}/todos/${id}`, editingTodo);
            setTodos(todos.map(todo => todo._id === id ? response.data : todo));
            setEditingTodo(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            const response = await axios.patch(`${BASE_URL}/todos/toggle/${id}`);
            setTodos(todos.map(todo => 
                todo._id === id ? response.data : todo
            ));
        } catch (error) {
            console.error(error);
        }
    };

   return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="border p-2 mr-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border p-2 mr-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Todo
                </button>
            </form>

            <div className="space-y-4">

{todos.map(todo => (
    <div key={todo._id} className="border p-4 rounded">
        {editingTodo && editingTodo._id === todo._id ? (
            <div className="flex gap-2">
                <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    className="border p-2"
                />
                <input
                    type="text"
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    className="border p-2"
                />
                <button
                    onClick={() => handleUpdate(todo._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        ) : (
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo._id)}
                        className="w-5 h-5"
                    />
                    <div>
                        <h3 className={`font-bold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                            {todo.title}
                        </h3>
                        <p className={todo.completed ? 'text-gray-500' : ''}>
                            {todo.description}
                        </p>
                    </div>
                </div>
                <div className="space-x-2">
                    <button
                        onClick={() => setEditingTodo(todo)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(todo._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        )}
    </div>
))}
            </div>
        </div>
    );
};

export default New;