import { response } from "express";

import { subirArchivo } from "../helpers/subir-archivo.js";
import Usuario from "../models/usuario.js";
import Producto from "../models/producto.model.js";
import path from "path";
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivos = async (req,res = response) => {
//Los archivos siempre se mandan en el body de la request

//aca pregunta si en la request viene la propiedad files,entonces, si no hay manda un 400 q es badrequest 

//lo del req.files.archivo es xq necesito que venga el nombre del archivo

//Imagenes

try {
    
    const nombre = await subirArchivo(req.files,undefined,'imgs');
    res.json({
        nombre
    })
    
} catch (msg) {
    res.status(400).json({msg})
}
}


const actualizarImagen = async (req,res=response) =>{
    const __dirname = path.resolve();

    //Asi desestructuro los argumentos que mando en los parametros de /coleccion/id
    const {id, coleccion } = req.params

    let modelo ;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con el ID '
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese ID '
                })
            }
            break;
    
        default:
            return res.status(500).json({msg:' Se me olvido validar esto '})
            break;
    }


    if (modelo.img){
        //Borrar la imagen del servidor
        let pathImagen = path.join(process.cwd(), `uploads/${coleccion}/${modelo.img}`);
                if (fs.existsSync(pathImagen)){
            console.log("netra aca para borrar")
            //esto es para borra si existe en el modelo y en la coleccion y si existe en el path
            fs.unlinkSync(pathImagen)
        }
    }

    //Limpiar imagenes previas

    const nombre  = await subirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre;
    
    await modelo.save();

    res.json(
        modelo
    )
}

const mostrarImagen = async(req,res=response)=>{

    const { id,coleccion} = req.params
    let modelo;

    console.log("esta es la coleccion",coleccion)
    switch (coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con ese ID'
                })
            }
            break;
        case 'productos':
            console.log("entro aca xq es productos")
            modelo = await Producto.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese ID'
                })
            }
            break;
        default:
            return res.status(500).json({
                msg:'Se me olvido programar esto'
            })
    }

    if (modelo.img){
        //Borrar la imagen del servidor
        let pathImagen = path.join(process.cwd(), `uploads/${coleccion}/${modelo.img}`);
        if (fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen)
            //esto es para borra si existe en el modelo y en la coleccion y si existe en el path
        }
    }
 

    const pathImagen = path.join(__dirname,'../assets/no-image.jpg')
    res.sendFile(pathImagen)


}



const actualizarImagenCloudinary = async (req,res=response) =>{
    const __dirname = path.resolve();

    //Asi desestructuro los argumentos que mando en los parametros de /coleccion/id
    const {id, coleccion } = req.params

    let modelo ;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo){
                return res.status(400).json({
                    msg:'No existe un usuario con el ID '
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo){
                return res.status(400).json({
                    msg:'No existe un producto con ese ID '
                })
            }
            break;
    
        default:
            return res.status(500).json({msg:' Se me olvido validar esto '})
            break;
    }


    if (modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr(nombreArr.length -1)
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id)
        //Borrar la imagen del servidor
  
    }
    const {tempFilePath} = req.files.archivo
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
    res.json(modelo)

}




export {
    cargarArchivos, actualizarImagen,mostrarImagen,actualizarImagenCloudinary
}