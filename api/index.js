import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import sequelize from './database/database.js';


const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(express.json());
app.use('/api', routes);


app.listen(PORT, async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server is running on port ${PORT}`);
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
});

