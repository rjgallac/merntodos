import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';

const app = express();
dotenv.config();
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/todos', todosRoutes);

const mongodb = 'mongodb+srv://' + process.env.mongouser +':' + process.env.mongopassword +'@cluster0.6qsz2.mongodb.net/item-database?retryWrites=true&w=majority&appName=Cluster0';

const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>res.send("hi"))

mongoose.connect(mongodb)
    .then(() => {
        console.log(`server running on port ${PORT}`)
        app.listen(PORT);

    })
    .catch(err => console.log(err))