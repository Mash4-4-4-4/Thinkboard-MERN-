//building api
import express from "express"
import router from "./routes/notesRoutes.js";
import cors from "cors";
import { connectdb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
const app=express();

app.use(cors(
  {
    origin:"http://localhost:5173",
  }
)); //when you call an api but from different link then this error happens


//middleware - that runs between req and res and next()passes to the next middleware
app.use(express.json());
app.use(rateLimiter);
app.use((req,res,next)=>
{
  console.log(`req method is ${req.method}& req url is${req.url}`);
  next();
});

app.use("/api/notes",router);
connectdb().then(()=>
{
app.listen(5001,()=>
{
    console.log("its working!");
});
})
