import { response } from "express";
import Producto from "../models/producto.model.js"; 

// productosDelete,
//   createProducto,
//   obtenerProductoById,
//   actualizarProducto,

const obtenerProductos = async (req, res) => {
//obtener categorias, el total, el paginado, con un objeto llamado populate para tener
//toda la info del usuario que modifico ese registro

  //El limite es la cantidawd q quiero q vayan, y el skip es de desde donde quiero que vengan
  const { limite = 5, desde = 0 } = req.query;
  const query = {estado:true}
  //El Promise.all me permite mandar un arreglo con todas promesas que quiero que se ejecuten
  //haciendo const[] hago una desestructuracion de arreglos

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .populate('usuario','nombre')
      .populate('categoria','nombre')
      .limit(limite)
      .skip(desde),
  ]);
  console.log(productos)

  res.json({
    productos
  });
};

//otro get pero solo con el populate osea q recibe el id

const obtenerProductoById = async (req,res= response)=>{
  const {id} = req.params;
  const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')

  res.json(producto);
}

const createProducto = async (req, res = response) => {
  //De esta manera saco todo lo q no voy a cambiar fuera del body
   const {estado, usuario , ...body} = req.body
   //Compruebo que no exista en la base de datos
   const productoDB = await Producto.findOne({nombre : body.nombre})

   if(productoDB){
    return res.status(400).json({
      msg:`El producto ${productoDB} ya existe`
    })
   }

   //Genero la data que quiera guardar , asi con ... mando todo lo demas
   const data = {
    ...body,
    nombre : body.nombre.toUpperCase(),
    usuario: req.usuario._id
   }

   console.log("Esta es la data ",data)
   const producto = new Producto(data)

  //Guardar en BD
  await producto.save();


//Cuando se crea algo se manda el status 201 que es que se creo
  res.status(201).json({
    producto
  });
};

const actualizarProducto = async (req, res = response) => {

  //cambiarle el nombre a la categoria
  const { id } = req.params;

  //esta manera de desestructura me permite quedarme con el resto 
  // que es lo quiero modificar, lo que no quiero modificar lo saco lo dejo a un costado
  if (data.nombre){
    const { estado, usuario,...data} = req.body;
  }
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  //con esto tengo el usuario y el nombre de la categoria, ( y el dueño del token q actualiza la categoria)

  const producto = await Producto.findByIdAndUpdate(id,data,{
    new : true
  })


  res.status(403).json({
    producto,
  });
};


//borrar categoria solo cambiar el estado a false 
const productosDelete = async (req, res) => {
  //Como en el midleware le agregue en la request al Usuario validado con el Id llega el usuario tambien
  const { id } = req.params;

  //Fisicamente lo borramos
  //no conviene borrar un usuariuo xq se pierde la integridad referencial

  const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false },{new:true});

  res.status(403).json({
    productoBorrado,
  });
};

export {
  obtenerProductos,
  productosDelete,
  actualizarProducto,
  createProducto,
  obtenerProductoById
};
