const express = require(`express`);
const app = express();
const path = require(`path`);
//middleWare
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/Public')));
//Routes
const homepage = require(`./Routes/homePage`);
app.use('/Online-C-Compiler',homepage);
//server live
app.listen(5000,()=>{console.log(`Server has Started`)})