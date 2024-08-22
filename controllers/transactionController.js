const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");
const { logAction } = require("../controllers/auditController");
const AuditLog = require("../models/AuditLog");

// Función para realizar un depósito
async function deposit(req, res) {
  const { accountId, amount } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account)
      return res.status(404).json({ message: "Cuenta no encontrada" });

    account.balance += amount;
    await account.save();

    const transaction = new Transaction({
      accountId,
      type: "deposit",
      amount,
      status: "completed",
    });
    await transaction.save();

    // Registrar auditoría
    await   logAction(req.user.id, "deposit", { accountId, amount });

    res.json({ message: "Depósito realizado con éxito", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al realizar el depósito", error: error.message });
  }
}

// Función para realizar un retiro
async function withdraw(req, res) {
  const { accountId, amount } = req.body;

  try {
    const account = await Account.findById(accountId);
    if (!account)
      return res.status(404).json({ message: "Cuenta no encontrada" });

    if (account.balance < amount) {
      return res.status(400).json({ message: "Fondos insuficientes" });
    }

    account.balance -= amount;
    await account.save();

    const transaction = new Transaction({
      accountId,
      type: "withdrawal",
      amount,
      status: "completed",
    });
    await transaction.save();

    // Registrar auditoría
    await AuditLog.logAction(req.user.id, "withdraw", { accountId, amount });

    res.json({ message: "Retiro realizado con éxito", transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al realizar el retiro", error: error.message });
  }
}

// Función para realizar una transferencia
async function transfer(req, res) {
  const { fromAccountId, toAccountId, amount } = req.body;

  try {
    // Verifica si los IDs son ObjectId válidos; si no, asume que es un accountNumber
    const fromAccount = mongoose.Types.ObjectId.isValid(fromAccountId)
      ? await Account.findById(fromAccountId)
      : await Account.findOne({ accountNumber: fromAccountId });

    const toAccount = mongoose.Types.ObjectId.isValid(toAccountId)
      ? await Account.findById(toAccountId)
      : await Account.findOne({ accountNumber: toAccountId });

    if (!fromAccount || !toAccount) {
      return res.status(404).json({ message: "Cuenta no encontrada" });
    }

    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: "Fondos insuficientes" });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save();
    await toAccount.save();

    const transaction = new Transaction({
      accountId: fromAccount._id,
      toAccountId: toAccount._id,
      type: "transfer",
      amount,
      status: "completed",
    });
    await transaction.save();

    // Registrar auditoría
    await logAction(req.user.id, "transfer", {
      fromAccountId: fromAccount._id,
      toAccountId: toAccount._id,
      amount,
    });

    res.json({ message: "Transferencia realizada con éxito", transaction });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al realizar la transferencia",
        error: error.message,
      });
  }
}

async function revertTransaction(req, res) {
    const { id } = req.params;

    console.log(`Revirtiendo transacción con ID: ${id}`);

    try {
        const auditLog = await AuditLog.findOne({ _id: id, action: 'transfer' });
        if (!auditLog) {
            console.log('Registro de auditoría no encontrado');
            return res.status(404).json({ message: 'Registro de auditoría no encontrado' });
        }

        console.log('Registro de auditoría encontrado:', auditLog);

        const { fromAccountId, toAccountId, amount } = auditLog.metadata;

        const fromAccount = await Account.findById(fromAccountId);
        const toAccount = await Account.findById(toAccountId);

        console.log('Cuenta de origen:', fromAccount);
        console.log('Cuenta de destino:', toAccount);

        // Revertir la transacción según el tipo
        if (auditLog.action === 'transfer') {
            // Deberíamos revertir la transferencia correctamente:
            // Restar el monto de la cuenta de destino y agregarlo a la cuenta de origen
            fromAccount.balance += amount;  // Devolver el monto a la cuenta de origen
            toAccount.balance -= amount;    // Retirar el monto de la cuenta de destino

            console.log('Revirtiendo transferencia de', amount);
        } else if (auditLog.action === 'withdraw') {
            fromAccount.balance += amount;
            console.log('Revirtiendo retiro de', amount);
        } else if (auditLog.action === 'deposit') {
            fromAccount.balance -= amount;
            console.log('Revirtiendo depósito de', amount);
        } else {
            console.log('Tipo de transacción no soportado para reversión:', auditLog.action);
            return res.status(400).json({ message: 'Tipo de transacción no soportado para reversión' });
        }

        await fromAccount.save();
        if (toAccount) await toAccount.save();

        // Actualizar el estado del log de auditoría
        auditLog.status = 'reverted';
        await auditLog.save();

        // Registrar auditoría de la reversión
        await logAction(req.user.id, 'revert_transaction', { transactionId: auditLog._id });

        console.log('Transacción revertida con éxito');
        res.json({ message: 'Transacción revertida con éxito', auditLog });
    } catch (error) {
        console.error('Error al revertir la transacción:', error);
        res.status(500).json({ message: 'Error al revertir la transacción', error: error.message });
    }
}
module.exports = {
  deposit,
  withdraw,
  transfer,
  revertTransaction,
};
