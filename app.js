import { Server } from "./models/server.js";
import dotenv from "dotenv";

dotenv.config();
const server = new Server();

console.log("Hola mundo");

//Con esto levanto el servidor
server.listen();
