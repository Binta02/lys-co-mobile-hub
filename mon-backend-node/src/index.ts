import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import paymentRoutes from './routes/payments';
dotenv.config();

const app = express();
const port = process.env.PORT || 4242;

app.use(cors());
app.use(express.json());

// Utilisation des routes Stripe
app.use('/api', paymentRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
