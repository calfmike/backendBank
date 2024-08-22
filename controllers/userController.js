const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuditLog = require("./auditController");

// Crear un nuevo usuario
async function registerUser(req, res) {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json({ message: "Usuario registrado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
}

// Listar todos los usuarios
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
}

// Buscar usuarios por nombre o ID
async function searchUsers(req, res) {
  const { username, id } = req.query;

  try {
    let query = {};

    if (username) {
      query.username = { $regex: new RegExp(username, "i") }; // Búsqueda insensible a mayúsculas
    }

    if (id) {
      query._id = id;
    }

    const users = await User.find(query);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios con los criterios proporcionados" });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar usuarios", error: error.message });
  }
}

// Editar un usuario existente
async function updateUser(req, res) {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario actualizado", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
}

// Eliminar un usuario
async function deleteUser(req, res) {
  try {
      const user = await User.findById(req.params.id);  // Buscar el usuario por `id` proporcionado en los parámetros
      if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      await user.deleteOne();  // Eliminar el usuario
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
}

// Inicio de sesión de usuario
async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
}

// Obtener perfil de usuario
async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el perfil del usuario", error: error.message });
  }
}

// Actualizar perfil de usuario
async function updateUserProfile(req, res) {
  const { username, email } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "Perfil actualizado", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el perfil del usuario", error: error.message });
  }
}

// Cambiar contraseña de usuario
async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Registrar auditoría
    await AuditLog.logAction(req.user.id, "change_password");

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar la contraseña", error: error.message });
  }
}

module.exports = {
  registerUser,
  getAllUsers,
  searchUsers,
  updateUser,
  deleteUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
};
