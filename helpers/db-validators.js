import Role from "../models/role.js";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.model.js";
import Producto from "../models/producto.model.js";


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

export const existeCategoriaPorId = async (id)=>{
   const existeCategoria = await Categoria.findById(id)
   if (!existeCategoria){
    throw new Error (`El id no existe ${id}`)
   }
}


export const existeProductoPorId = async (id)=>{
  const existeProducto = await Producto.findById(id)
  if (!existeProducto){
   throw new Error (`El id no existe ${id}`)
  }
}


//Valido las colecciones perimtidas
export const validarColeccionesPermitidas = (coleccion ='', colecciones=[])=>{
  const estaIncluida = colecciones.includes(coleccion);

  if(!estaIncluida){
    throw new Error (`La coleccion ${coleccion} no esta incluida en las colecciones permitidas que son ${colecciones}`)
  }
  
  return true
}