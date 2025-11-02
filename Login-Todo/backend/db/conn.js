const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IPPractical')
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));
