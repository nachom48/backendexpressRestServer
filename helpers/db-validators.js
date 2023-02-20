import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

export const isRoleValid = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos `);
  }
};

export const isEmailValid = async (email = "") => {
  console.log("entro aca", email);
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El mail : ${email} ya esta registrado con otro usuario`);
  }
};

export const existeUsuarioPorId = async (id) => {
  try {
    const existe = await Usuario.findById(id);
  } catch (error) {
    throw new Error("El id no es valido de un usuario con ID");
  }
};
