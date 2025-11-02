import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Error logging in');
            }

            alert(data.message);
            localStorage.setItem('token', data.token);
            navigate('/nav');
        } catch (error) {
            alert(error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
                <h2 className="text-center text-2xl font-semibold">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Login;
