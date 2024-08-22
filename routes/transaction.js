const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { deposit, withdraw, transfer, revertTransaction } = require('../controllers/transactionController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Ruta para realizar un depósito
router.post('/deposit', authMiddleware, roleMiddleware("admin"), deposit);

// Ruta para realizar un retiro
router.post('/withdraw', authMiddleware, roleMiddleware("admin"), withdraw);

// Ruta para realizar una transferencia
router.post('/transfer', authMiddleware, transfer);

// Ruta para revertir una transacción
router.post('/revert/:id', authMiddleware,roleMiddleware("admin"), revertTransaction);

module.exports = router;
 