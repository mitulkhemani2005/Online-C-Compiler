const express = require(`express`);
const route = express.Router();
const path = require(`path`);
const fs = require('fs');
const {exec} = require("node:child_process");

route.get(`/`,(req,res)=>{
    res.sendFile(path.join(__dirname,`../Views/homePage.html`));
})
route.post('/',(req,res)=>{
    const body = req.body.parcel;
    // console.log(body)
    fs.writeFileSync(path.join(__dirname,'../main.c'),body,(err)=>{
        if (err){
            console.log(err);
        }
    })
    exec("gcc main.c",(error,stdout, stderr)=>{
        if (error){
            console.log(`Compilation Error: ${stderr}`);
            return;
        }
        else{
            exec("a.exe",(error2,stdout2, stderr2)=>{
                if(!error2){
                    console.log(`Run Time Error: ${stderr}`);
                    // return;
                }
                console.log(stdout2);
                return;
            })
        }
    })
})
module.exports = route;