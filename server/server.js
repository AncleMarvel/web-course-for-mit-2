import env from './env.js';
import express from 'express';
import apiRoutes from './routes/api.js';
import cors from 'cors';


const app = express();
const PORT = env.SERVER_PORT || 3000;

app.use(cors({
    origin: '*', // Разрешаем всё
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Если нужен доступ к сессионным данным
}));

app.use(express.json());

// Используем маршруты API
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});