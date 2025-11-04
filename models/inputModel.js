import { model, Schema, mongoose, models } from "mongoose";

const inputSchema = new mongoose.Schema({
  userInput: String,
  time: String,
});

const InputModel =
  models.InputModel || mongoose.model("InputModel", inputSchema);

export default InputModel;
