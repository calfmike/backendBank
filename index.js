const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL del frontend si es diferente
  }));

mongoose.connect(process.env.MONGO_URI
)
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error al conectar a la base de datos:', error));

app.get('/', (req, res) => {
    res.send('Servidor de Banco en funcionamiento');
});

// Importar y usar las rutas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const auditRoutes = require('./routes/audit');
const transactionRoutes = require('./routes/transaction'); // Nueva ruta para transacciones

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/transactions', transactionRoutes); // Integrar la nueva ruta 


app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
