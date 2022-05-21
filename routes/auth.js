const express = require("express");
const router = express.Router();
const sequelize = require("../db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { body } = req;
  const user = await sequelize.models.users.findOne({
    where: {
      email: body.email,    // revisar si el usuario existe con el email 
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!user.validPassword(body.password)) {
    return res.status(401).json({ message: "Invalid credentials" }); // validacion de password 
  }

  // Generate a token

  const token = jwt.sign({ userId: user.id }, "secretkey", {  // si todo ok !! me da permiso de entrar 
    expiresIn: 36000, 
  });

  return res.json({
    message: "Authenticated sucessfully",
    token,
  });
});

router.post("/signup",  async  (req, res) => {
// Validarás si el usuario existe dentro de tu base de datos, en caso de ser verdadero, continuaras con el proceso.
const { body } = req;
let user = await sequelize.models.users.findOne({
    email: body.email,
  });

  if (user) {
    return res.status(400).json({ message: "this email is already registered" });
  }
// logica de hendlers Ojo con las propiedades del User
// Creating the user
user = await sequelize.models.users.create({
    name: body.name,
    lastname: body.lastname,
    email: body.email,
    password: body.password,
    type: 'client',  // lo damos definido para que sea solo para crear usuario Cliente
})
    // Saving user
    await user.save();
    return res.json({ message: 'Your account was created successfully'});

// Verificarás en tu base de datos que el usuario haya sido creado correctamente.

});

module.exports = router;
