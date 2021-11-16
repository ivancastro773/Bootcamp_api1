/* import methodOverride from "method-override";
import express  from "express";
import cors from "cors"; */

const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();
let port = process.env.PORT || 3000;

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({extended:true}));
app.use(express.json);

let users = ["lisa","homero","marge","bart"];

app.post("/user/create",(req,res)=>{
    const { name, email, alias, password} = req.body;
    users.push(req.params.name);
    users.push(req.params.email);
    users.push(req.params.alias);
    users.push(req.params.password);
    res.send("Usuario creado!");
});

app.get("/users",(req,res)=>{
    res.send(users);
});

app.post("/user/create/:nombre",(req,res)=>{

    users.push(req.params.nombre);
    res.send("Usuario creado!");
});

app.delete("/user/delete/:nombre",(req,res)=>{
    var nameDeleted = users.indexOf(req.params.nombre);
    users.splice( nameDeleted, 1 );
    res.send("Usuario eliminado!");
});
app.put("/user/edit/:nombre/:nombreedit",(req,res)=>{
    var nameEdit= users.indexOf(req.params.nombre);
    users[nameEdit] = req.params.nombreedit;
    res.send("Usuario editado!");
});

app.listen(port,()=>{
    console.log("Escuchando en el puerto 3000");
});