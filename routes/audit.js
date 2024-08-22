const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const { getAuditLogs, filterAuditLogs } = require('../controllers/auditController');

const router = express.Router();

// Ruta para obtener los registros de auditoría (solo accesible para administradores)
router.get('/logs', authMiddleware, roleMiddleware('admin'), getAuditLogs);

// Ruta para filtrar los registros de auditoría
router.get('/filter', authMiddleware, roleMiddleware('admin'), filterAuditLogs);

module.exports = router;