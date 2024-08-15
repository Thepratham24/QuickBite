
let express = require("express");
let app = express();
const port = 5000;
const mongoDB = require("./db");
// const cors = require('cors');
mongoDB();


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.get("/",(req, res)=>{
    res.send("Response send")
})
//using thunder client we can send post request on it
app.use(express.json()) 
app.use("/api",require("./Routes/CreateUsers"))            //user naam d collection bna reha hai database de vich
app.use("/api",require("./Routes/DisplayData"))            //user naam d collection bna reha hai database de vich
app.use("/api/auth",require("./Routes/OrderData"))





app.listen(port, ()=>{
    console.log("Port no. 5000 is in use....")
})












// global.foodData = require('./db')(function call(err, data, CatData) {
//     // console.log(data)
//     if(err) console.log(err);
//     global.foodData = data;
//     global.foodCategory = CatData;
//   })
  
//   const express = require('express')
//   const app = express()
//   const port = 5000
//   app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
//   app.use(express.json())
  
//   app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
//   app.use('/api/auth', require('./Routes/Auth'));
  
//   app.listen(port, () => {
//     console.log(`Example app listening on http://localhost:${port}`)
//   })