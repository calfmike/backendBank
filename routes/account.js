const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { 
    createAccount, 
    getAllAccounts, 
    getAccountsByUser, 
    updateAccount, 
    deleteAccount 
} = require('../controllers/accountController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Ruta para crear una cuenta
router.post('/create', authMiddleware, createAccount);

// Ruta para obtener todas las cuentas (solo accesible para administradores)
router.get('/', authMiddleware, roleMiddleware('admin'), getAllAccounts);

// Ruta para obtener las cuentas de un usuario específico por su ID
router.get('/user/:userId', authMiddleware, roleMiddleware('admin'), getAccountsByUser);

// Ruta para actualizar una cuenta específica por su ID
router.put('/:id', authMiddleware, updateAccount);

// Ruta para eliminar una cuenta específica por su ID
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteAccount);

module.exports = router;
