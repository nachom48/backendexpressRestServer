//el callback o next es lo que se ejecuta luego de que se ejecute toda la funcion
const validarArchivoASubir = (req,res = response,next ) =>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
          msg:
          'No hay archivos en la peticion'});
      }

      //Si todo pasa necesito llamar el next para que avance al siguiente midleware
      next();
}

export {
    validarArchivoASubir
}