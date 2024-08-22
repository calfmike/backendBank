const Account = require('../models/Account');
const User = require('../models/User');
const crypto = require('crypto');
const AuditLog = require('./auditController');
const { logAction } = require('./auditController');

async function createAccount(req, res) {
    const { accountType } = req.body;  // Eliminamos el userId de req.body
  
    try {
      const userId = req.user.id;  // Usamos el userId del JWT, garantizado por el middleware
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado o no autorizado' });
  
      const accountNumber = crypto.randomBytes(4).toString('hex');
      const account = new Account({
        userId,  // Asignamos el userId del usuario autenticado
        accountNumber,
        accountType,
      });
      await account.save();
  
      // Registrar auditoría
      await AuditLog.logAction(userId, 'create_account', { accountId: account._id, userId });
  
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cuenta', error: error.message });
    }
  }
// Listar todas las cuentas
async function getAllAccounts(req, res) {
  try {
    const accounts = await Account.find().populate('userId', 'username email');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cuentas', error: error.message });
  }
}

// Obtener cuentas de un usuario específico
async function getAccountsByUser(req, res) {
  const { userId } = req.params;

  try {
    const accounts = await Account.find({ userId }).populate('userId', 'username email');

    if (!accounts || accounts.length === 0) {
      return res.status(404).json({ message: 'Este usuario no tiene cuentas asociadas' });
    }

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cuentas del usuario', error: error.message });
  }
}

// Editar una cuenta existente
async function updateAccount(req, res) {
  const { id } = req.params;
  const { accountNumber, accountType, balance } = req.body;

  try {
    const updatedAccount = await Account.findByIdAndUpdate(id, { accountNumber, accountType, balance }, { new: true });
    if (!updatedAccount) return res.status(404).json({ message: 'Cuenta no encontrada' });
    res.json({ message: 'Cuenta actualizada', updatedAccount });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cuenta', error: error.message });
  }
}

// Eliminar una cuenta
async function deleteAccount(req, res) {
  const { id } = req.params;

  try {
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) return res.status(404).json({ message: 'Cuenta no encontrada' });
    res.json({ message: 'Cuenta eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cuenta', error: error.message });
  }
}

module.exports = {
  createAccount,
  getAllAccounts,
  getAccountsByUser,
  updateAccount,
  deleteAccount,
};
