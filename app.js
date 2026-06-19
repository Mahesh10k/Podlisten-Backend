let express=require("express")
let app=express()
let cors=require("cors")
let dashboardRoutes=require("./Routes/dashboardRoutes")
const connectDB = require("./Config/Mongodb");
const dotenv = require("dotenv");
dotenv.config();
connectDB()

app.use(express.json())


var whitelist = ['https://pod-listen.vercel.app', 'http://localhost:5173',"https://podlisten-podcasts.vercel.app"]
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:true}))
app.use("/",dashboardRoutes) 
  
app.listen(process.env.PORT,()=>{
    console.log("server started on port 4040")
})

