const AuditLog = require('../models/AuditLog');

// Registrar acción de auditoría
async function logAction(userId, action, metadata = {}) {
  try {
    const auditLog = new AuditLog({
      userId,
      action,
      metadata,
    });
    await auditLog.save();
  } catch (error) {
    console.error('Error al registrar la auditoría:', error);
  }
}

// Obtener todos los registros de auditoría
async function getAuditLogs(req, res) {
  try {
    const logs = await AuditLog.find().populate('userId', 'username email');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros de auditoría', error: error.message });
  }
}

// Filtrar registros de auditoría
async function filterAuditLogs(req, res) {
  const { userId, action, startDate, endDate } = req.query;
  try {
    const query = {};
    if (userId) query.userId = userId;
    if (action) query.action = action;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    const logs = await AuditLog.find(query).populate('userId', 'username email');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error al filtrar los registros de auditoría', error: error.message });
  }
}

module.exports = {
  logAction,
  getAuditLogs,
  filterAuditLogs,
};
