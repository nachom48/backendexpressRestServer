import { response } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import Usuario from "../models/usuario.js";
import Categoria from "../models/usuario.js";
import mongoose from 'mongoose';
import Producto from "../models/usuario.js";



const coleccionesPermitidas = [
    'categoria',
    'productos',
    'roles',
    'usuarios'
]

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoId = mongoose.Types.ObjectId.isValid(termino);

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regExp = new RegExp(termino, 'i');
    //El find siempre devuelve un arreglo vacio si no encuentra nada
    const usuarios = await Usuario.find({
        $or: [
            { nombre: regExp },
            { email: regExp },

        ],
        $and: [{ estado: true }]
    })

    res.json({
        results: usuarios
    })

}


const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }



    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categoria':
            buscarCategorias(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;
    }


}


const buscarCategorias = async (termino = '', res = response) => {
    const esMongoId = mongoose.Types.ObjectId.isValid(termino);

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regExp = new RegExp(termino, 'i');
    //El find siempre devuelve un arreglo vacio si no encuentra nada
    const categorias = await Categoria.find({ nombre: regExp, estado: true })

        res.json({
            results: categorias
        })

}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoId = mongoose.Types.ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regExp = new RegExp(termino, 'i');
    //El find siempre devuelve un arreglo vacio si no encuentra nada
    const productos = await Producto.find({ nombre: regExp, estado: true }).populate('categoria','nombre')

        res.json({
            results: productos
        })

}

export { buscar }