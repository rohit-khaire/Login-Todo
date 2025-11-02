const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
require('./db/conn')

// Routes
app.use('/auth', require('./routes/login'));
app.use('/todos', require('./routes/todo'));

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
