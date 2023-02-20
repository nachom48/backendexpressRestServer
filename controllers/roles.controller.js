import { response } from "express";
import Role from "../models/role.js";

const rolesPost = async (req, res) => {
  console.log(req.body);
  const { rol } = req.body;
  const rol1 = new Role({ rol });
  //Guardar en BD
  await rol1.save();

  res.status(403).json({
    rol1,
  });
};

export { rolesPost };
