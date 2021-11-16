/* import methodOverride from "method-override";
import express  from "express";
import cors from "cors"; */

const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();

let port = process.env.PORT || 3000;

let users = ["lisa","homero","marge","bart"];

app.get("/users",(req,res)=>{
    res.send(users);
});

app.post("/user/create/:nombre",(req,res)=>{

    users.push(req.params.nombre);
    res.send("Usuario creado!");
});

app.get("/user/delete/:nombre",(req,res)=>{
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