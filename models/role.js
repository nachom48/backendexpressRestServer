import { Schema, model } from "mongoose";

const roleSchema = Schema({
  rol: {
    type: String,
  },
});

export default model("Role", roleSchema);
