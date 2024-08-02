import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import { mongodbURL, port } from "./config.js"
import { bookModel } from "./models/books.js";
import bookRoutes  from "./routes/bookRoutes.js"
const app = express();
app.use(express.json())
app.use(cors());


mongoose.connect(mongodbURL)
.then(()=>{
    app.listen(port, (req,res)=>{
        console.log(`Server is listening on port ${port}`);
    })
})
.catch((error)=>{
    console.log(error);
})

app.use("/books", bookRoutes)