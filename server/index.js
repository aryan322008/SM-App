import bodyParser from "body-parser"
import express from "express"
const app = express()
import dbConnection from "./mongoConnect.js";
import * as dotenv from "dotenv"
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"

app.use(bodyParser.json({limit: '100mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true }))

dotenv.config()

dbConnection().catch(err => console.log(err))

app.use(cors())

app.use(bodyParser.json())

app.use("/post", postRoutes)

app.use("/auth", authRoutes)


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
// task left add a cluster to it 