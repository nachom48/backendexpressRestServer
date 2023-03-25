import { Schema, model } from "mongoose";

const ProductoSchema = Schema({

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
  ,
  precio :{
    type : Number,
    default : 0
  },
  categoria :{
    type : Schema.Types.ObjectId,
    ref: 'Categoria',
    required : true
},
descripcion : {
  type: String
},
disponible : {
  type : Boolean,
  default: true
},
img : {
  type:String
}
}
);

ProductoSchema.methods.toJSON = function (){
  // const { __v,estado, _id,...data} = this.toObject()
  // return data
}
export default model("Producto", ProductoSchema);
