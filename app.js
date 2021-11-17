/* import methodOverride from "method-override";
import express  from "express";
import cors from "cors"; */

const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const multer = require("multer");
import dayjs from "dayjs";
import { v4 as uuid4 } from "uuid";

const app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let users = ["lisa", "homero", "marge", "bart"];

const multerConfig = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./bucket");
    },
    filename:function(req,file,cb){
        let idImg = uuid4().split("-")[0];
        let day = dayjs().format('DD-MM-YYYY')
        cb(null,`${day}.${idImg}.${file.originalname}`);
    }
});

const multerMiddle = multer({storage:multerConfig});

app.post("/upload",multerMiddle.single("file"), (req, res) => {
    if(req.file){
        res.send("Imagen guardada");
    }else{
      res.send("Error al cargar la imagen");  
    }
    
});



/* app.post("/user/create", (req, res) => {
  const { name, email, alias, password } = req.body;
  users.push(req.body.name);
  users.push(req.body.email);
  users.push(req.body.alias);
  users.push(req.body.password);
  res.send("Usuario creado!");
});
app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/user/create/:nombre", (req, res) => {
  users.push(req.params.nombre);
  res.send("Usuario creado!");
});

app.delete("/user/delete/:nombre", (req, res) => {
  var nameDeleted = users.indexOf(req.params.nombre);
  users.splice(nameDeleted, 1);
  res.send("Usuario eliminado!");
});
app.put("/user/edit/:nombre/:nombreedit", (req, res) => {
  var nameEdit = users.indexOf(req.params.nombre);
  users[nameEdit] = req.params.nombreedit;
  res.send("Usuario editado!");
}); */

app.listen(port, () => {
  console.log("Escuchando en el puerto 3000");
});
