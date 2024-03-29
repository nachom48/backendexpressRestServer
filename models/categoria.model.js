import { Schema, model } from "mongoose";

const CategoriaSchema = Schema({

  nombre: {
    type: String,
    required:[true,'El nombre es obligatoria'],
    unique:true
  },

  estado: {
    type: Boolean,
    default: true,
    required:true
  },
//Tengo q ver q usuario creo la categoria, 
  usuario :{
    type:Schema.Types.ObjectId,
    ref: 'Usuario',
    required:[true,'Debe tener un usuario que crea la categoria']
  }
});

CategoriaSchema.methods.toJSON = function (){
  const { __v,estado, _id,...data} = this.toObject()
  return data
}
export default model("Categoria", CategoriaSchema);
