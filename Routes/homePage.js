const express = require(`express`);
const route = express.Router();
const path = require(`path`);
const fs = require('fs');
const {exec} = require("node:child_process");
app = express();
app.use(express.json())

function outputCalculation(){
    return new Promise((ans)=>{
        exec("gcc main.c",(error,stdout, stderr)=>{
            if (error){
                // console.log(`Compilation Error: ${stderr}`);
                return ans({output:stderr})
            }
            else{
                exec("a.exe",(error2,stdout2, stderr2)=>{
                    if(error2){
                        // console.log(`Run Time Error: ${stderr2}`);
                        return ans({output:stderr2})
                    }
                    // console.log(stdout2);
                    return ans({output:stdout2})
                })
            }
        })
    })
}
route.get(`/`,(req,res)=>{
    res.sendFile(path.join(__dirname,`../Views/homePage.html`));
})
route.post('/',async (req,res)=>{
    const body = req.body.parcel;
    // console.log(body)
    fs.writeFileSync(path.join(__dirname,'../main.c'),body,(err)=>{
        if (err){
            console.log(err);
        }
    })
    const result  = await outputCalculation()
    // console.log(result.output)   
    res.json(result)

})
// route.get(`/output`,async (req,res)=>{
//     // const result  = await outputCalculation()
//     // // console.log(result.output)
//     // res.json(result)
    
// })
module.exports = route;