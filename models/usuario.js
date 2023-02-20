import mongoose from "mongoose";
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"],
  },
  email: {
    type: String,
    required: [true, "El correo es necesario"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es Obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  //Estoy sacando la version y la password de la informacion que muestro
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

export default model("Usuario", usuarioSchema);
