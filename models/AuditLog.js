const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // Acción realizada (e.g., 'change_password', 'create_account')
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object }, // Información adicional relevante (e.g., IP, detalles específicos)
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
