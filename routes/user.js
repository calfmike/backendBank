const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  searchUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// Ruta para obtener el perfil del usuario autenticado
router.get("/profile", authMiddleware, getUserProfile);

// Ruta para actualizar el perfil del usuario autenticado
router.put("/profile", authMiddleware, updateUserProfile);

// Ruta para cambiar la contraseña del usuario autenticado
router.put("/change-password", authMiddleware, changePassword);

// Ruta para obtener todos los usuarios (solo accesible para administradores)
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Ruta para buscar usuarios por nombre o ID
router.get("/search", authMiddleware, roleMiddleware("admin"), searchUsers);

// Ruta para actualizar un usuario específico por su ID
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateUser);

// Ruta para eliminar un usuario específico por su ID
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
