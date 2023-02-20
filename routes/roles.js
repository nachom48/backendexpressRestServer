import { Router } from "express";
import { rolesPost } from "../controllers/roles.controller.js";

const router = Router();

router.post("/", rolesPost);

export { router };
