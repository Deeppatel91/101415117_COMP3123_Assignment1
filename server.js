const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const employeeRoutes = require('./routes/EmployeeRoutes');

const app = express();
app.use(express.json());

const MONGODB_URI = 'mongodb+srv://Deep:Deep9195@cluster0.ztcjj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
        process.exit(1);
    });
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
