import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <nav>
                <ul>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
