import jwt from "jsonwebtoken";

//Como trabajo con callbacks voy a tenerq ue generar una promesa manualmente
// uid = user identifier
//el body del jsonwebtoken se puede abrir ,este es el payload y aca voy a guardar el uid
export const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    //Esta es la instruccion para generar un nuevo JWT
    //primero va el payload, despues se le puede poner una clave secreta para enmascarar el JWT, y despues van las opciones q es un objeto, dsp
    //un callback ( se ejecuta cuando se ejecuta lo otro) q pueed tener dos cosas, el err o q se reseuvla el token
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
