import express from "express";
import cors from "cors";
import { router as usuariosRouter } from "../routes/usuarios.js";
//Con cors lo protejo o pongo que solo algunos pueden entrar a mi pagina web, es un middleware que lo proteje
//Permite protejer nuestro servidor de una manera superficial pero muchos navegadores web va a dar errores
// si el cors no esta habilitado nuestro endpoint
//Los middleware se usan con el app.use( ) de esa forma se que es un middleware
//Siempre hay que configurar el CORS

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.usuariosPath = "/api/usuarios";
    //Middleware son funciones que le agregan otra funcionalidad a nuestro web server,es una funcion que se ejecuta cuando nosotros
    //levnatemos nuestro servidor

    //llamando el metodo this.routes sejecuta el metodo que configura las rutas
    //Rutas de mi aplicacion
    this.routes();
    //En el constructor de las clases en Javascript es donde vamos a colorcar cada una de las propiedades y se ponen con el this
  }

  middlewares() {
    //Cors
    this.app.use(cors());

    //Directorio Publico
    this.app.use(express.static("public"));

    //Para que la informacion que viene hacia el backend mediante alguna peticion put post delete viene en formato  Json
    //Parseo y lectura del body, de esta manera cualquier info q venga la va a intentar serializar a un formato Json
    this.app.use(express.json());
  }

  routes() {
    //aca tengo los endpoints
    //pero estan e nla carpeta router
    this.app.use("/api/usuarios", usuariosRouter);
  }

  //Con esta funcion levanto el servidor en ese puerto
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriedno en puerto", this.port);
    });
  }
}

export { Server };
