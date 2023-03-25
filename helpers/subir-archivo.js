import { v4 } from "uuid";
import path from "path";

//En este tipo de casos cuando se necesita que algo salga bien o mal, es mejor trabajar con Promesas
const subirArchivo = (files,extensionesValidas = ['png','jpg','jepg','gif'], carpeta ='') => {

    return new Promise ((resolve,reject)=>{

        const { archivo } = files;     
        
        const nombreCortado = archivo.name.split('.');
        
        const extension = nombreCortado[nombreCortado.length-1];
        
        //Validar la extension

        if (!extensionesValidas.includes(extension)){
            return reject (`La extension ${extension} no es parte de las extensiones validas que son ${extensionesValidas}`)
        }

        const __dirname = path.resolve();

        const nombreTemp = v4()+"."+extension

        // Este path apunta a la carpeta controller donde llamo el __dirname y lo tengo que resolver 
        const uploadPath = path.join(__dirname,'/uploads/',carpeta, nombreTemp);

    archivo.mv(uploadPath, (err)=> {
        if (err) {
           reject(err);
        }

        resolve(nombreTemp)
   
        })
    //ACA BUSCA UAN PROPIEDAD SAMPLEFILE pero tenemos el nombre del archivo 

}
    )
}

export {
    subirArchivo
}