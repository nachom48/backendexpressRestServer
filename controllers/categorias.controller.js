import { response } from "express";
import Usuario from "../models/usuario.js";
import Categoria from "../models/categoria.model.js"; 


const obtenerCategorias = async (req, res) => {
//obtener categorias, el total, el paginado, con un objeto llamado populate para tener
//toda la info del usuario que modifico ese registro

  //El limite es la cantidawd q quiero q vayan, y el skip es de desde donde quiero que vengan
  const { limite = 5, desde = 0 } = req.query;
  const query = {estado:true}
  //El Promise.all me permite mandar un arreglo con todas promesas que quiero que se ejecuten
  //haciendo const[] hago una desestructuracion de arreglos

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments({ estado: true }),
    Categoria.find({ estado: true }).populate('usuario','nombre').limit(limite).skip(desde),
  ]);

  res.status(403).json({
    total,
    categorias,
  });
};

//otro get pero solo con el populate osea q recibe el id

const obtenerCategoriaById = async (req,res= response)=>{
  const {id} = req.params;
  const categoria = await Categoria.findById(id).populate('usuario','nombre')
  res.json(categoria);
}

const createCategoria = async (req, res = response) => {
  //asi la paso en mayuscula
   const nombre = req.body.nombre.toUpperCase()
  console.log("esta es la categoria",nombre)
   //Compruebo que no exista en la base de datos
   const categoriaDB = await Categoria.findOne({nombre})

   if(categoriaDB){
    return res.status(400).json({
      msg:`La categoria ${categoriaDB} ya existe`
    })
   }

   //Genero la data que quiera guardar 
   const data = {
    nombre,
    usuario: req.usuario._id
   }

   const categoria = new Categoria(data)

  //Guardar en BD
  await categoria.save();


//Cuando se crea algo se manda el status 201 que es que se creo
  res.status(201).json({
    categoria
  });
};

const actualizarCategoria = async (req, res = response) => {

  //cambiarle el nombre a la categoria
  const { id } = req.params;

  //esta manera de desestructura me permite quedarme con el resto 
  // que es lo quiero modificar, lo que no quiero modificar lo saco lo dejo a un costado
  const { estado, usuario,...data} = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  //con esto tengo el usuario y el nombre de la categoria, ( y el dueño del token q actualiza la categoria)

  const categoria = await Categoria.findByIdAndUpdate(id,data,{
    new : true
  })


  res.status(403).json({
    categoria,
  });
};


//borrar categoria solo cambiar el estado a false 
const categoriasDelete = async (req, res) => {
  //Como en el midleware le agregue en la request al Usuario validado con el Id llega el usuario tambien
  const { id } = req.params;

  //Fisicamente lo borramos
  //no conviene borrar un usuariuo xq se pierde la integridad referencial

  const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false },{new:true});

  res.status(403).json({
    categoriaBorrada,
  });
};

export {
  obtenerCategorias,
  categoriasDelete,
  actualizarCategoria,
  createCategoria,
  obtenerCategoriaById
};
