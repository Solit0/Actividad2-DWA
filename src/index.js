import express from 'express';
import usersRouter from './routes/users.js';
import publicacionesRouter from './routes/publicaciones.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js'; 
dotenv.config();
const app = express();
app.use(express.json());

app.get('/',(req,res)=> {
    res.send('El servidor está funcionando correctamente.');
});

app.use('/users', usersRouter);
app.use('/publicaciones', publicacionesRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});